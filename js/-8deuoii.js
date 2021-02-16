var utmCookie = {
    cookieNamePrefix: "",
    utmParams: ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"],
    cookieExpiryDays: 365,
    createCookie: function (c, d, e) {
        if (e) {
            var b = new Date();
            b.setTime(b.getTime() + (e * 24 * 60 * 60 * 1000));
            var a = "; expires=" + b.toGMTString()
        } else {
            var a = ""
        }
        document.cookie = this.cookieNamePrefix + c + "=" + d + a + "; path=/"
    },
    readCookie: function (b) {
        var e = this.cookieNamePrefix + b + "=";
        var a = document.cookie.split(";");
        for (var d = 0; d < a.length; d++) {
            var f = a[d];
            while (f.charAt(0) == " ") {
                f = f.substring(1, f.length)
            }
            if (f.indexOf(e) == 0) {
                return f.substring(e.length, f.length)
            }
        }
        return null
    },
    eraseCookie: function (a) {
        this.createCookie(a, "", -1)
    },
    getParameterByName: function (b) {
        b = b.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
        var a = "[\\?&]" + b + "=([^&#]*)";
        var d = new RegExp(a);
        var c = d.exec(window.location.search);
        if (c == null) {
            return ""
        } else {
            return decodeURIComponent(c[1].replace(/\+/g, " "))
        }
    },
    utmPresentInUrl: function () {
        var d = false;
        for (var a = 0; a < this.utmParams.length; a++) {
            var c = this.utmParams[a];
            var b = this.getParameterByName(c);
            if (b != "" && b != undefined) {
                d = true
            }
        }
        return d
    },
    writeUtmCookieFromParams: function () {
        for (var a = 0; a < this.utmParams.length; a++) {
            var c = this.utmParams[a];
            var b = this.getParameterByName(c);
            this.createCookie(c, b, this.cookieExpiryDays)
        }
    },
    writeCookieOnce: function (a, c) {
        var b = this.readCookie(a);
        if (!b) {
            this.createCookie(a, c, this.cookieExpiryDays)
        }
    },
    writeReferrerOnce: function () {
        value = document.referrer;
        if (value === "" || value === undefined) {
            this.writeCookieOnce("referrer", "direct")
        } else {
            this.writeCookieOnce("referrer", value)
        }
    },
    referrer: function () {
        return this.readCookie("referrer")
    }
};
utmCookie.writeReferrerOnce();
if (utmCookie.utmPresentInUrl()) {
    utmCookie.writeUtmCookieFromParams()
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "-";
} /*  
jQuery(function () {
    jQuery(document).on('submit', 'form', function (event) {

        var valid = true;


        var form = $(this).serialize();
        jQuery('button').each(
            function (value) {
                jQuery(this).prop('disabled', true);
            }
        )
        jQuery('input[type=submit]').each(
            function (value) {
                jQuery(this).prop('disabled', true);

            }
        )

        var d = new Date();
        var month = d.getMonth() + 1;
        var day = d.getDate();
        var year = d.getFullYear();
        var today = (day<10?'0':'')+ day + '/' +(month<10?'0':'')+ month + '/' + year;

        var date = new Date();
        var formated_date = today;
        d = new Date();
// d is "Sun Oct 13 2013 20:32:01 GMT+0530 (India Standard Time)"
        datetext = d.toTimeString();
// datestring is "20:32:01 GMT+0530 (India Standard Time)"
// Split with ' ' and we get: ["20:32:01", "GMT+0530", "(India", "Standard", "Time)"]
// Take the first value from array :)
        datetext = datetext.split(' ')[0];

    

        var h='https://script.google.com/macros/s/AKfycbwrTzi4rAzd1nEt9ETEsDT38EVzafOGm-JUKM0oNmF_YVVEPA/exec?'+form+"&domain="+location.hostname+"&utm_source="+ getCookie("utm_source")+ "&utm_medium="+getCookie('utm_medium')+ "&utm_campaign="+getCookie('utm_campaign')+ "&utm_term="+getCookie('utm_term') +"&utm_content="+getCookie('utm_content')+"&today="+formated_date+"&today2="+  datetext;
console.log(n);
                s2 = document.createElement("script"), s2.type = "text/javascript", s2.src = decodeURI(h), body2 = document.getElementsByTagName("body"), body2[0].appendChild(s2);
        setTimeout(
            function () {
                var form = $(this).serialize();
                jQuery('button').each(
                    function (value) {
                        jQuery(this).prop('disabled', false);
                    }
                )
                jQuery('input[type=submit]').each(
                    function (value) {
                        jQuery(this).prop('disabled', false);

                    }
                )
            },3000
        )
    });

});*/
