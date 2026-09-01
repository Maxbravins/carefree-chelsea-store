<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

    <title>Welcome to Carefree Chelsea</title>
</head>

<body style="margin:0; padding:0; background:#f4f7fb; font-family:Arial, Helvetica, sans-serif;">

    <div style="max-width:600px; margin:40px auto; background:#ffffff; border-radius:16px; overflow:hidden;">

        <!-- Header -->

        <div style="background:#021B3A; padding:35px; text-align:center;">

            <h1 style="color:#ffffff; margin:0; font-size:30px;">
                Carefree Chelsea
            </h1>

            <p style="color:#9ec5ff; margin:10px 0 0;">
                Official Chelsea Merchandise Store
            </p>

        </div>


        <!-- Content -->

        <div style="padding:40px 35px;">

            <h2 style="color:#021B3A; margin-top:0;">
                Welcome to the family! 💙
            </h2>

            <p style="color:#444; font-size:16px; line-height:1.7;">
                Thank you for subscribing to the Carefree Chelsea newsletter.
            </p>

            <p style="color:#444; font-size:16px; line-height:1.7;">
                You're now among the first to hear about our latest Chelsea
                kits, exclusive offers, limited editions and matchday
                promotions.
            </p>

            <div style="text-align:center; margin:35px 0;">

                <a
                    href="{{ config('app.url') }}"
                    style="display:inline-block; background:#034694; color:#ffffff; text-decoration:none; padding:15px 30px; border-radius:10px; font-weight:bold;"
                >
                    Visit Carefree Chelsea
                </a>

            </div>

            <p style="color:#777; font-size:14px; line-height:1.6;">
                You can unsubscribe from our newsletter at any time.
            </p>

        </div>


        <!-- Footer -->

        <div style="background:#021B3A; padding:25px; text-align:center;">

            <p style="color:#9ec5ff; margin:0; font-size:13px;">
                © {{ date('Y') }} Carefree Chelsea Store.
                All Rights Reserved.
            </p>

        </div>

    </div>

</body>
</html>
