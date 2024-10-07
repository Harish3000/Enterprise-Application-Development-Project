package com.example.ead_mobile.API;
import com.example.ead_mobile.util.SharedPrefManager;
import java.security.SecureRandom;
import java.security.cert.CertificateException;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSession;
import javax.net.ssl.TrustManager;
import javax.net.ssl.X509TrustManager;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

/**
 * ApiCarts class for handling HTTP requests related to carts using Retrofit.
 * handles SSL configuration and JWT token authentication
 *
 * @author IT21272240
 */

public class ApiCarts {
    private static final String BASE_URL = "https://192.168.1.8:44381/";
    private static Retrofit retrofit = null;

    /**
     * Creates and returns a Retrofit instance for making API calls to add items to the cart.
     * sets up SSL configuration and adds the JWT token to requests if available.
     * @return Retrofit instance for API calls.
     */
    public static Retrofit addToCart() {
        if (retrofit == null) {
            try {
                // Create a trust manager that does not validate certificate chains
                TrustManager[] trustAllCerts = new TrustManager[]{
                        new X509TrustManager() {
                            @Override
                            public void checkClientTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                            }

                            @Override
                            public void checkServerTrusted(java.security.cert.X509Certificate[] chain, String authType) throws CertificateException {
                            }

                            @Override
                            public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                                return new java.security.cert.X509Certificate[]{};
                            }
                        }
                };

                // Install the all trusting trust manager
                SSLContext sslContext = SSLContext.getInstance("SSL");
                sslContext.init(null, trustAllCerts, new SecureRandom());

                // Create an ssl socket factory with our all-trusting manager
                javax.net.ssl.SSLSocketFactory sslSocketFactory = sslContext.getSocketFactory();

                OkHttpClient.Builder builder = new OkHttpClient.Builder();
                builder.sslSocketFactory(sslSocketFactory, (X509TrustManager) trustAllCerts[0]);

                // Skip hostname verification
                builder.hostnameVerifier(new HostnameVerifier() {
                    @Override
                    public boolean verify(String hostname, SSLSession session) {
                        return true;
                    }
                });

                // Add the interceptor for JWT token
                builder.addInterceptor(chain -> {
                    Request original = chain.request();
                    Request.Builder requestBuilder = original.newBuilder()
                            .method(original.method(), original.body());

                    // Add JWT token to header if available
                    String token = SharedPrefManager.getInstance(null).getToken();
                    if (token != null) {
                        requestBuilder.header("Authorization", "Bearer " + token);
                    }

                    Request request = requestBuilder.build();
                    return chain.proceed(request);
                });

                OkHttpClient okHttpClient = builder.build();

                //Initialize Retrofit with the base URL, Gson converter and custom OkHttpClient
                retrofit = new Retrofit.Builder()
                        .baseUrl(BASE_URL)
                        .addConverterFactory(GsonConverterFactory.create())
                        .client(okHttpClient)
                        .build();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }
        return retrofit;
    }
}