package com.cardeditor;

import android.content.SharedPreferences;
import android.app.ActivityManager;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
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
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class LockScreenActivity extends ReactActivity {

    private static LockScreenActivity singleton;
    private String androidPin;
    private String applicationPin;
    public String pincode = "";
    Context context;
    ImageView dot1;
    ImageView dot2;
    ImageView dot3;
    ImageView dot4;

    public void updatePin(String value, boolean isLoginWithPIN) {
        if (isLoginWithPIN) {
            applicationPin = value;
        } else {
            androidPin = value;
        }
    }

    public String getApplicationPin() {
        return applicationPin;
    }

    public void setBothPin(String pin1, String pin2) {
        androidPin = pin1;
        applicationPin = pin2;
    }

    public class ButtonTouchListener implements View.OnTouchListener {
        @Override
        public boolean onTouch(View v, MotionEvent event) {
            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    // update opacity level of button background drawable
                    v.getBackground().setAlpha(100); // 50% opacity
                    break;
                case MotionEvent.ACTION_UP:
                    // reset opacity level of button background drawable
                    v.getBackground().setAlpha(255); // 100% opacity
                    break;
            }
            return false;
        }
    }

    public void unlockTrigger() {

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

    public void vibrateDevice() {

        Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        // Vibrate for 500 milliseconds
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            v.vibrate(VibrationEffect.createOneShot(200, VibrationEffect.DEFAULT_AMPLITUDE));
        } else {
            // deprecated in API 26
            v.vibrate(200);
        }
    }

    public void setPin(String num) {
        if (pincode.length() <= 4) {
            pincode += num;
        }
        if (pincode.length() == 1) {
            dot1.setBackgroundResource(R.drawable.filldot);
        }
        if (pincode.length() == 2) {
            dot2.setBackgroundResource(R.drawable.filldot);
        }
        if (pincode.length() == 3) {
            dot3.setBackgroundResource(R.drawable.filldot);
        }
        if (pincode.length() == 4) {

            dot4.setBackgroundResource(R.drawable.filldot);

            SharedPreferences sharedPref = getSharedPreferences("com.cardeditor.preferences", Context.MODE_PRIVATE);
            String androidPin = sharedPref.getString("androidPin", "");
            String applicationPin = sharedPref.getString("applicationPin", "");
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
            dot1.setBackgroundResource(R.drawable.outlinedot);
            dot2.setBackgroundResource(R.drawable.outlinedot);
            dot3.setBackgroundResource(R.drawable.outlinedot);
            dot4.setBackgroundResource(R.drawable.outlinedot);
            pincode = "";
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        CreateLockScreen();
    }

    public void CreateLockScreen() {

        setContentView(R.layout.activity_main);
        Button btn_0 = (Button) findViewById(R.id.button_0);
        Button btn_1 = (Button) findViewById(R.id.button_1);
        Button btn_2 = (Button) findViewById(R.id.button_2);
        Button btn_3 = (Button) findViewById(R.id.button_3);
        Button btn_4 = (Button) findViewById(R.id.button_4);
        Button btn_5 = (Button) findViewById(R.id.button_5);
        Button btn_6 = (Button) findViewById(R.id.button_6);
        Button btn_7 = (Button) findViewById(R.id.button_7);
        Button btn_8 = (Button) findViewById(R.id.button_8);
        Button btn_9 = (Button) findViewById(R.id.button_9);

        dot1 = (ImageView) findViewById(R.id.dot1);
        dot2 = (ImageView) findViewById(R.id.dot2);
        dot3 = (ImageView) findViewById(R.id.dot3);
        dot4 = (ImageView) findViewById(R.id.dot4);

        btn_1.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("1");
            }
        });

        btn_1.setOnTouchListener(new ButtonTouchListener());
        btn_2.setOnTouchListener(new ButtonTouchListener());
        btn_3.setOnTouchListener(new ButtonTouchListener());
        btn_4.setOnTouchListener(new ButtonTouchListener());
        btn_5.setOnTouchListener(new ButtonTouchListener());
        btn_6.setOnTouchListener(new ButtonTouchListener());
        btn_7.setOnTouchListener(new ButtonTouchListener());
        btn_8.setOnTouchListener(new ButtonTouchListener());
        btn_9.setOnTouchListener(new ButtonTouchListener());
        btn_0.setOnTouchListener(new ButtonTouchListener());

        btn_2.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("2");
            }
        });

        btn_3.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("3");
            }
        });

        btn_4.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("4");
            }
        });

        btn_5.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("5");
            }
        });

        btn_6.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("6");
            }
        });

        btn_7.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("7");
            }
        });

        btn_8.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("8");
            }
        });

        btn_9.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("9");
            }
        });

        btn_0.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                setPin("0");
            }
        });

        final int flags = View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                | View.SYSTEM_UI_FLAG_FULLSCREEN
                | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY;

        // This work only for android 4.4+
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
        // Log.d("LOG_APP", "onBackPressed: back button pressed ");
        // Toast.makeText(this, "back button pressed", Toast.LENGTH_SHORT).show();
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
