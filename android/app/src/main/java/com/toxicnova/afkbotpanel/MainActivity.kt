package com.toxicnova.afkbotpanel

import android.app.Activity
import android.graphics.Color
import android.net.Uri
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.webkit.CookieManager
import android.webkit.SslErrorHandler
import android.webkit.WebChromeClient
import android.webkit.WebResourceRequest
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Button
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.TextView
import android.widget.Toast

class MainActivity : Activity() {
    private val background = Color.rgb(15, 17, 21)
    private val panel = Color.rgb(24, 27, 34)
    private val purple = Color.rgb(124, 92, 255)
    private val text = Color.rgb(232, 235, 242)
    private val muted = Color.rgb(139, 147, 167)
    private var root: LinearLayout? = null
    private var webView: WebView? = null
    private var serverUrl: String = ""

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window.statusBarColor = background
        window.navigationBarColor = Color.rgb(11, 13, 17)
        serverUrl = getPreferences(MODE_PRIVATE).getString("server_url", "") ?: ""
        if (serverUrl.isBlank()) showSetup() else showPanel(serverUrl)
    }

    private fun makeRoot(): LinearLayout {
        val layout = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setBackgroundColor(background)
            fitsSystemWindows = true
        }
        root = layout
        setContentView(layout)
        return layout
    }

    private fun showSetup() {
        webView?.let {
            (it.parent as? ViewGroup)?.removeView(it)
            it.destroy()
        }
        webView = null
        val layout = makeRoot()
        val content = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(24), dp(24), dp(24), dp(24))
        }
        layout.addView(content, LinearLayout.LayoutParams(-1, -1))

        val title = TextView(this).apply {
            text = "⛏️  AFK Bot Panel"
            textSize = 25f
            setTextColor(text)
            setTypeface(null, android.graphics.Typeface.BOLD)
        }
        content.addView(title)

        val subtitle = TextView(this).apply {
            text = "Connect to your running AFK Bot Panel server. The same live view, movement, chat, and inventory controls will open inside this app."
            textSize = 15f
            setTextColor(muted)
            setPadding(0, dp(12), 0, dp(22))
        }
        content.addView(subtitle)

        val input = EditText(this).apply {
            hint = "https://your-server.example.com"
            setTextColor(text)
            setHintTextColor(muted)
            textSize = 15f
            singleLine = true
            inputType = android.text.InputType.TYPE_CLASS_TEXT or
                android.text.InputType.TYPE_TEXT_VARIATION_URI
            imeOptions = EditorInfo.IME_ACTION_GO
            setPadding(dp(14), dp(13), dp(14), dp(13))
            setBackgroundColor(panel)
            setText(serverUrl)
        }
        content.addView(input, LinearLayout.LayoutParams(-1, dp(52)))

        val connect = Button(this).apply {
            text = "Connect"
            setTextColor(Color.WHITE)
            setBackgroundColor(purple)
            isAllCaps = false
            setOnClickListener { connectTo(input.text.toString()) }
        }
        val buttonParams = LinearLayout.LayoutParams(-1, dp(50))
        buttonParams.topMargin = dp(14)
        content.addView(connect, buttonParams)

        val note = TextView(this).apply {
            text = "Enter the server address only. The panel's own password screen will appear when required."
            textSize = 12f
            setTextColor(muted)
            setPadding(0, dp(14), 0, 0)
        }
        content.addView(note)

        input.setOnEditorActionListener { _, action, _ ->
            if (action == EditorInfo.IME_ACTION_GO) {
                connectTo(input.text.toString())
                true
            } else false
        }
    }

    private fun connectTo(raw: String) {
        var value = raw.trim()
        if (value.isBlank()) {
            Toast.makeText(this, "Enter your server address", Toast.LENGTH_SHORT).show()
            return
        }
        if (!value.startsWith("http://", true) && !value.startsWith("https://", true)) {
            value = "https://$value"
        }
        val uri = Uri.parse(value)
        if ((uri.scheme != "http" && uri.scheme != "https") || uri.host.isNullOrBlank()) {
            Toast.makeText(this, "Enter a valid http or https address", Toast.LENGTH_LONG).show()
            return
        }
        value = value.trimEnd('/')
        serverUrl = value
        getPreferences(MODE_PRIVATE).edit().putString("server_url", value).apply()
        showPanel(value)
    }

    private fun showPanel(url: String) {
        val layout = makeRoot()
        val toolbar = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
            setPadding(dp(12), dp(4), dp(8), dp(4))
            setBackgroundColor(panel)
        }

        val label = TextView(this).apply {
            text = "⛏️ AFK Bot Panel"
            textSize = 15f
            setTextColor(text)
            setTypeface(null, android.graphics.Typeface.BOLD)
        }
        toolbar.addView(label, LinearLayout.LayoutParams(0, -2, 1f))

        val change = Button(this).apply {
            text = "Server"
            textSize = 12f
            isAllCaps = false
            setOnClickListener { showSetup() }
        }
        toolbar.addView(change, LinearLayout.LayoutParams(-2, dp(42)))
        layout.addView(toolbar, LinearLayout.LayoutParams(-1, dp(50)))

        val browser = WebView(this)
        webView = browser
        browser.setBackgroundColor(background)
        browser.setLayerType(View.LAYER_TYPE_HARDWARE, null)
        val cookieManager = CookieManager.getInstance()
        cookieManager.setAcceptCookie(true)
        cookieManager.setAcceptThirdPartyCookies(browser, true)

        browser.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            databaseEnabled = true
            loadsImagesAutomatically = true
            javaScriptCanOpenWindowsAutomatically = true
            mixedContentMode = WebSettings.MIXED_CONTENT_COMPATIBILITY_MODE
            mediaPlaybackRequiresUserGesture = false
            cacheMode = WebSettings.LOAD_DEFAULT
            builtInZoomControls = false
            displayZoomControls = false
            useWideViewPort = true
            loadWithOverviewMode = true
        }

        browser.webChromeClient = WebChromeClient()
        browser.webViewClient = object : WebViewClient() {
            override fun shouldOverrideUrlLoading(view: WebView, request: WebResourceRequest): Boolean {
                val scheme = request.url.scheme?.lowercase()
                return scheme != "http" && scheme != "https"
            }

            override fun onReceivedSslError(
                view: WebView,
                handler: SslErrorHandler,
                error: android.net.http.SslError
            ) {
                handler.cancel()
                Toast.makeText(this@MainActivity, "Secure connection failed. Check the server certificate and address.", Toast.LENGTH_LONG).show()
            }

            override fun onPageFinished(view: WebView, loadedUrl: String) {
                super.onPageFinished(view, loadedUrl)
                CookieManager.getInstance().flush()
            }
        }
        layout.addView(browser, LinearLayout.LayoutParams(-1, 0, 1f))
        browser.loadUrl(url + "/")
    }

    override fun onBackPressed() {
        val browser = webView
        if (browser != null && browser.canGoBack()) {
            browser.goBack()
        } else {
            super.onBackPressed()
        }
    }

    private fun dp(value: Int): Int = (value * resources.displayMetrics.density).toInt()
}
