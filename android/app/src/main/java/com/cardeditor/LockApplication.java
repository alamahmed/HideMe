package com.cardeditor;

import android.app.Application;

/**
 * Created by andika on 2/25/17.
 */

public class LockApplication extends Application {

   public boolean lockScreenShow=false;
    public int notificationId=19893434;

    @Override
    public void onCreate() {
        super.onCreate();
    }

}
