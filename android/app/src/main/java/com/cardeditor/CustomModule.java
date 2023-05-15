package com.cardeditor;

import android.content.Intent;
import android.provider.Settings;
import android.widget.Toast;

import androidx.annotation.NonNull;

import com.cardeditor.utils.LockScreen;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class CustomModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    CustomModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @ReactMethod
    public void show() {
        Toast.makeText(reactContext, "Hi from Android", Toast.LENGTH_LONG).show();
    }

    @ReactMethod
    public void askLock () {
        Intent intent = new Intent(reactContext,ActivtyAsk.class);
        getCurrentActivity().startActivity(intent);
    }

    @ReactMethod
    public void activateInstance () {
        LockScreen.getInstance().init(reactContext,true);
        LockScreen.getInstance().active();
    }
    @ReactMethod
    public void deactivateInstance () {
        LockScreen.getInstance().init(reactContext,true);
        LockScreen.getInstance().deactivate();
    }

    @ReactMethod
    public void isActivateInstance (Callback callBack) {
        LockScreen.getInstance().init(reactContext,true);
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