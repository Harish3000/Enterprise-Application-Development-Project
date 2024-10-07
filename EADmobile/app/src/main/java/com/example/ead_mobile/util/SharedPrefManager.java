package com.example.ead_mobile.util;

import android.content.Context;
import android.content.SharedPreferences;

import com.example.ead_mobile.model.LoginResponse;
import com.example.ead_mobile.model.User;

/**
 *
 * Features:
 * - Save user details after login.
 * - Retrieve user details for session management
 * - Check if a user is logged in
 * - Get authentication token for API requests
 * - Clear user data upon logout
 * Usage
 * To use this class, obtain an instance using the getInstance() method, and call
 * the desired methods to manage user data
 *
 * @author IT21272240
 */
public class SharedPrefManager {
    private static final String SHARED_PREF_NAME = "MyAppSharedPref";
    private static final String KEY_EMAIL = "keyEmail";
    private static final String KEY_USER_ID = "keyUserId";
    private static final String KEY_ROLE = "keyRole";
    private static final String KEY_TOKEN = "keyToken";

    private static SharedPrefManager mInstance;
    private static Context mCtx;

    private SharedPrefManager(Context context) {
        mCtx = context;
    }

    //Get the singleton instance of SharedPrefManager
    public static synchronized SharedPrefManager getInstance(Context context) {
        if (mInstance == null) {
            mInstance = new SharedPrefManager(context);
        }
        return mInstance;
    }

    //Save the user details in Shared Preferences
    public void saveUser(LoginResponse user) {
        SharedPreferences sharedPreferences = mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.putString(KEY_USER_ID, user.getUserId());
        editor.putString(KEY_ROLE, user.getRole());
        editor.putString(KEY_TOKEN, user.getJwt());
        editor.apply();
    }

    // Check if the user is logged in by verifying if the email is present in Shared Pref
    public boolean isLoggedIn() {
        SharedPreferences sharedPreferences = mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE);
        return sharedPreferences.getString(KEY_EMAIL, null) != null;
    }

    //Retrieve the User object from Shared Preferences
    public User getUser() {
        SharedPreferences sharedPreferences = mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE);
        return new User(
                sharedPreferences.getString(KEY_EMAIL, null),
                sharedPreferences.getString(KEY_ROLE, null),
                sharedPreferences.getString(KEY_USER_ID, null)

        );
    }
    // Get the JWT token from Shared Preferences
    public String getToken() {
        SharedPreferences sharedPreferences = mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE);
        return sharedPreferences.getString(KEY_TOKEN, null);
    }
    // Clear all saved user data from Shared Preferences
    public void clear() {
        SharedPreferences sharedPreferences = mCtx.getSharedPreferences(SHARED_PREF_NAME, Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = sharedPreferences.edit();
        editor.clear();
        editor.apply();
    }
}