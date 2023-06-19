package com.cardeditor;

import android.content.SharedPreferences;
import android.content.Intent;
import android.provider.Settings;
import android.widget.Toast;
import android.util.Log;
import androidx.annotation.NonNull;
import android.content.Context;
import com.cardeditor.utils.LockScreen;
import android.app.Activity;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.cardeditor.LockScreenActivity;

public class CustomModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    public String androidPin = "";
    public String applicationPin = "";

    CustomModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void SetPin(String value, boolean isLoginWithPIN) {
        SharedPreferences sharedPref = reactContext.getSharedPreferences(
                "com.cardeditor.preferences", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPref.edit();
        if (isLoginWithPIN) {
            editor.putString("applicationPin", value);
        } else {
            editor.putString("androidPin", value);
        }
        editor.apply();
    }

    @ReactMethod
    public void setBothPin(String androidPin, String applicationPin) {
        SharedPreferences sharedPref = reactContext.getSharedPreferences(
                "com.cardeditor.preferences", Context.MODE_PRIVATE);

        SharedPreferences.Editor editor = sharedPref.edit();
        editor.putString("androidPin", androidPin);
        editor.putString("applicationPin", applicationPin);
        editor.apply();
    }

    private LockScreenActivity getCurrentActivityInstance() {
        Activity currentActivity = getCurrentActivity();
        if (currentActivity instanceof LockScreenActivity) {
            return (LockScreenActivity) currentActivity;
        }
        return null;
    }

    @ReactMethod
    public void show() {
        Toast.makeText(reactContext, "Hi from Android", Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void askLock() {
        Intent intent = new Intent(reactContext, ActivtyAsk.class);
        getCurrentActivity().startActivity(intent);
    }

    @ReactMethod
    public void activateInstance() {
        LockScreen.getInstance().init(reactContext, true);
        LockScreen.getInstance().active();
    }

    @ReactMethod
    public void deactivateInstance() {
        LockScreen.getInstance().init(reactContext, true);
        LockScreen.getInstance().deactivate();
    }

    @ReactMethod
    public void isActivateInstance(Callback callBack) {
        LockScreen.getInstance().init(reactContext, true);
        boolean isActivated = LockScreen.getInstance().isActive();
        callBack.invoke(isActivated);
    }

    @ReactMethod
    public void getDeviceId(Promise promise) {
        try {
            String android_id = Settings.Secure.getString(reactContext.getContentResolver(),
                    Settings.Secure.ANDROID_ID);
            promise.resolve(android_id);
        } catch (Exception e) {
            promise.reject("Error", e);
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "LockNativeModule";
    }
}