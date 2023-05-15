package com.cardeditor;

import android.content.Intent;
import android.os.Bundle;
import android.provider.Settings;
import android.widget.CompoundButton;
import android.widget.ToggleButton;

import androidx.appcompat.app.AppCompatActivity;

import com.cardeditor.utils.LockScreen;
import com.cardeditor.utils.LockscreenService;

public class ActivtyAsk extends AppCompatActivity {

    ToggleButton toggleButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        toggleButton = (ToggleButton)findViewById(R.id.toggleButton);
        LockScreen.getInstance().init(this,true);
        if(LockScreen.getInstance().isActive()){
            toggleButton.setChecked(true);
        }else{
            toggleButton.setChecked(false);
        }

        toggleButton.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(CompoundButton compoundButton, boolean checked) {
                if(checked){

                    LockScreen.getInstance().active();
                }else{
                    LockScreen.getInstance().deactivate();
                }
            }
        });

    }


}
