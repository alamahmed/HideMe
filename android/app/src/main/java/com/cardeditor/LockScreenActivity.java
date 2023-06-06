import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.view.KeyEvent;
import android.view.Menu;
import android.view.MotionEvent;
import android.view.View;
import android.view.WindowManager;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class LockScreenActivity extends ReactActivity {

    private String pincode = "";
    private final String androidPin = "1234";
    private final String applicationPin = "7896";

    private ImageView[] dots = new ImageView[4];

    private class ButtonTouchListener implements View.OnTouchListener {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    // Update opacity level of button background drawable
                    v.getBackground().setAlpha(100); // 50% opacity
                    break;
                case MotionEvent.ACTION_UP:
                    // Reset opacity level of button background drawable
                    v.getBackground().setAlpha(255); // 100% opacity
                    break;
            }
            return false;
        }
    }

    private void unlockTrigger() {
        ReactInstanceManager mReactInstanceManager = getReactNativeHost().getReactInstanceManager();
        ReactApplicationContext reactContext = (ReactApplicationContext) mReactInstanceManager.getCurrentReactContext();

        // Create map for params
        WritableMap payload = Arguments.createMap();
        // Put data to map
        payload.putString("sessionId", "abc");
        // Get EventEmitter from context and send event thanks to it
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("triggerUnlock", payload);
    }

    private void vibrateDevice() {
        Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        // Vibrate for 200 milliseconds
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            v.vibrate(VibrationEffect.createOneShot(200, VibrationEffect.DEFAULT_AMPLITUDE));
        } else {
            // Deprecated in API 26
            v.vibrate(200);
        }
    }

    private void setPin(String num) {
        if (num == "-1" && pincode.length() > 0) {
            pincode = pincode.substring(0, pincode.length() - 1);
            dots[pincode.length() - 1].setBackgroundResource(R.drawable.outlinedot);
        } else if (pincode.length() < 4) {
            pincode += num;
            dots[pincode.length() - 1].setBackgroundResource(R.drawable.filldot);
        }
        if (pincode.length() == 4) {
            if (pincode.equals(androidPin)) {
                finish();
            } else if (pincode.equals(applicationPin)) {
                finish();
                Intent intent = new Intent(this, MainActivity.class);
                startActivity(intent);
                unlockTrigger();
            } else {
                vibrateDevice();
                Toast.makeText(getApplicationContext(), "Wrong Passcode", Toast.LENGTH_SHORT).show();
            }
            for (ImageView dot : dots) {
                dot.setBackgroundResource(R.drawable.outlinedot);
            }
            pincode = "";
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        int startNumber = 0; // Starting number for button labels
        int buttonCount = 10; // Number of buttons to handle

        ButtonTouchListener buttonTouchListener = new ButtonTouchListener();

        for (int i = 0; i < buttonCount; i++) {
            int buttonId = getResources().getIdentifier("btn_" + i, "id", getPackageName());
            Button button = findViewById(buttonId);
            button.setOnTouchListener(buttonTouchListener);
            final String label = String.valueOf(startNumber + i);
            button.setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View view) {
                    setPin(label);
                }
            });
        }
        int buttonId = getResources().getIdentifier("btn_remove", "id", getPackageName());
        Button button = findViewById(buttonId);
        button.setOnTouchListener(buttonTouchListener);
        final String label = String.valueOf("<-");
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("-1");
            }
        });

        final int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;

        // This works only for Android 4.4+
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            getWindow().getDecorView().setSystemUiVisibility(flags);

            // Code below is to handle presses of Volume up or Volume down.
            // Without this, after pressing volume buttons, the navigation bar will
            // show up and won't hide
            final View decorView = getWindow().getDecorView();
            decorView.setOnSystemUiVisibilityChangeListener(new View.OnSystemUiVisibilityChangeListener() {
                @Override
                public void onSystemUiVisibilityChange(int visibility) {
                    if ((visibility & View.SYSTEM_UI_FLAG_FULLSCREEN) == 0) {
                        decorView.setSystemUiVisibility(flags);
                    }
                }
            });
        }
    }

    @Override
    public void onAttachedToWindow() {
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON |
                WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD |
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN |
                WindowManager.LayoutParams.FLAG_LAYOUT_INSET_DECOR |
                WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS |
                WindowManager.LayoutParams.FLAG_FULLSCREEN |
                WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED);

        getWindow().getDecorView()
                .setSystemUiVisibility(View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        super.onAttachedToWindow();
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT && hasFocus) {
            getWindow().getDecorView().setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
        }
    }

    @Override
    public void onDetachedFromWindow() {
        super.onDetachedFromWindow();
    }

    @Override
    protected void onResume() {
        // ((LockApplication) getApplication()).lockScreenShow = true;
        super.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        ActivityManager activityManager = (ActivityManager) getApplicationContext()
                .getSystemService(Context.ACTIVITY_SERVICE);

        activityManager.moveTaskToFront(getTaskId(), 0);
    }

    @Override
    public void onBackPressed() {
        // Disable the back button functionality
    }

    @Override
    public boolean onPrepareOptionsMenu(Menu menu) {
        return false;
    }

    @Override
    protected void onStop() {
        super.onStop();
    }

    @Override
    public boolean onKeyDown(int keyCode, KeyEvent event) {
        if (keyCode == KeyEvent.KEYCODE_HOME) {
            return true;
        }
        return super.onKeyDown(keyCode, event);
    }
}
