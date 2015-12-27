window.onload = function() {

    // Date(year, month, day, hours, minutes, seconds, milliseconds);
    var current_date = new Date();

    // +1se +1mi +1ho +1da +1mo +1ye
    var addSeconds = function(date, seconds) {
        var new_date = current_date;
        var current_seconds = current_date.getSeconds();
        new_date.setSeconds(current_seconds + seconds);
        return new_date;
    };
    var addMinutes = function(date, minutes) {
        var new_date = current_date;
        var current_minutes = current_date.getMinutes();
        new_date.setMinutes(current_minutes + minutes);
        return new_date;
    };
    var addHours = function(date, hours) {
        var new_date = current_date;
        var current_hours = current_date.getHours();
        new_date.setHours(current_hours + hours);
        return new_date;
    };
    var addDays = function(date, days) {
        var new_date = current_date;
        var current_days = current_date.getDate();
        new_date.setDate(current_days + days);
        return new_date;
    };
    var addMonths = function(date, months) {
        var new_date = current_date;
        var current_months = current_date.getMonth();
        new_date.setMonth(current_months + months);
        return new_date;
    };
    var addYears = function(date, years) {
        var new_date = current_date;
        var current_years = current_date.getFullYear();
        new_date.setFullYear(current_years + years);
        return new_date;
    };

    var reset_input_class = function() {
        document.getElementById("input_1").className = "";
    };

    var placeholder_rotate = function() {
        var i = 0;
        var placeholders = ["2 fortnights, 1 week, and 500 days ago",
            "3 years and 20 months from now", "20 days, 6 hours in the past",
            "500 centuries in the future", "525600 minutes agone"];

        setInterval(function() {
            document.getElementById("input_1").className = "fade";
            setTimeout(function() {
                i = (i + 1) % placeholders.length;
                document.getElementById("input_1").className = "";
                document.getElementById("input_1").placeholder = placeholders[i];
            }, 500);
        }, 4000);
    };
    placeholder_rotate();

    document.getElementById("submit_1").onclick = function() {
        current_date = new Date();
        var input = document.getElementById("input_1").value;
        var actions = parse_input(input);
        if(actions[0] === "ER")
            document.getElementById("output_1").innerHTML = "Couldn't recognize the word \"" + actions[1] + "\".";
        else {
            var new_date = apply_actions(current_date, actions);
            var output_date = format_date(new_date);
            document.getElementById("output_1").innerHTML = output_date;
        }
    };

    document.getElementById("input_1").onkeyup = function(e) {
        if(e.keyCode === 13) document.getElementById("submit_1").click();
    };

    // TAB LOGIC
    var add_tab_logic = function() {
        var tabs = document.getElementsByClassName("tab");
        for(var i = 0; i < tabs.length; i++) {
            tab = tabs[i];
            console.log("changing to ", i, "tab");
            tab.onclick = function() {
                var to_hide = document.getElementsByClassName("current")[0].getAttribute("number");
                document.getElementById("tab_" + to_hide).style.display = "none";
                clear_current_tab();
                this.className = "tab current";
                var to_show = document.getElementsByClassName("current")[0].getAttribute("number");
                document.getElementById("tab_" + to_show).style.display = "block";

            };
        }
    };
    var clear_current_tab = function() {
        var tabs = document.getElementsByClassName("tab");
        for(var i = 0; i < tabs.length; i++) {
            tabs[i].className = "tab";
        }
    };
    add_tab_logic();

    var translate_input = function(time_string) {
        switch(time_string) {
            // BASE CASES
            case "SECOND":
            case "SECONDS":
                return "se";
            case "MINUTE":
            case "MINUTES":
                return "mi";
            case "HOUR":
            case "HOURS":
                return "ho";
            case "DAY":
            case "DAYS":
            case "NYCHTHEMERON":
            case "NYCHTHEMERONS":
            case "NYCTHEMERON":
            case "NYCTHEMERONS":
            case "NUCHTHEMERON":
            case "NUCHTHEMERONS":
                return "da";
            case "MONTH":
            case "MONTHS":
                return "mo";
            case "YEAR":
            case "YEARS":
            case "ANNUS":
            case "ANNI":
                return "ye";
            // EXTRA CASES
            case "MOMENT":
            case "MOMENTS":
                return "mt";
            case "PAHAR":
            case "PAHARS":
                return "pa";
            case "WEEK":
            case "WEEKS":
                return "we";
            case "TRIMESTER":
            case "TRIMESTERS":
                return "tr";
            case "OLYMPIAD":
            case "OLYMPIADS":
            case "QUADRENNIUM":
            case "QUADRENNIUMS":
                return "ol";
            case "DECADE":
            case "DECADES":
                return "de";
            case "CENTURY":
            case "CENTURIES":
                return "ce";
            case "MILLENNIUM":
            case "MILLENNIA":
            case "KYR":
            case "KYRS":
            case "KILOYEAR":
            case "KILOYEARS":
                return "ml";
            case "MYR":
            case "MYRS":
                return "my";
            case "FORTNIGHT":
            case "FORTNIGHTS":
                return "fn";
            // END OF STRING, PLUS MINUS
            case "FROM NOW":
            case "IN THE FUTURE":
            case "FUTURE":
            case "LATER":
                return "+";
            case "AGO":
            case "BEFORE":
            case "BEFORE NOW":
            case "PAST":
            case "IN THE PAST":
            case "AGONE":
            case "PRIOR":
                return "-";
            // NO CASE FOUND: ERROR
            default:
                return "ER";
        }
    };

    var apply_actions = function(d, actions) {
        var date = d;
        for(var i in actions) {
            var action = actions[i];
            var sign, number, time;
            if(action[0] === "+") sign = 1;
            else sign = -1;
            number = sign * parseInt(action.substring(1, action.length - 2));
            time = action.slice(-2);
            switch(time) {
                // BASE CASES
                case "se":
                    date = addSeconds(date, number);
                    break;
                case "mi":
                    date = addMinutes(date, number);
                    break;
                case "ho":
                    date = addHours(date, number);
                    break;
                case "da":
                    date = addDays(date, number);
                    break;
                case "mo":
                    date = addMonths(date, number);
                    break;
                case "ye":
                    date = addYears(date, number);
                    break;
                // EXTRA CASES
                case "mt":
                    date = addSeconds(date, number * 90);
                    break;
                case "pa":
                    date = addHours(date, number * 3);
                    break;
                case "we":
                    date = addDays(date, number * 7);
                    break;
                case "tr":
                    date = addMonths(date, number * 3);
                    break;
                case "ol":
                    date = addYears(date, number * 4);
                    break;
                case "de":
                    date = addYears(date, number * 10);
                    break;
                case "ce":
                    date = addYears(date, number * 100);
                    break;
                case "ml":
                    date = addYears(date, number * 1000);
                    break;
                case "my":
                    date = addYears(date, number * 1000000);
                    break;
                case "fn":
                    date = addDays(date, number * 14);
                    break;
                default:
                    break;
            }
        }
        return date;
    };

    // takes a string input and returns the action array
    var parse_input = function(input) {
        input = input.toUpperCase();
        var input_words = input.split(/,?\s+AND\s+|\s+|,\s+/);
        var actions = [];
        var number = "";
        var plus_minus = "+";
        for(var i in input_words) {
            var word = input_words[i];
            if(!isNaN(word)) {
                number = word;
            }
            else {
                var translated_time = translate_input(word);
                if(translated_time === "+" || translated_time == "-") {
                    plus_minus = translated_time;
                    break;
                }
                else if(translated_time !== "ER") {
                    actions.push(number + translated_time);
                    number = "";
                }
                else {
                    var translated_rest = translate_input(input_words.slice(i - input_words.length).join(" "));
                    if(translated_rest === "ER") {
                        actions = ["ER", word];
                        return actions;
                    }
                    else {
                        plus_minus = translated_rest;
                        break;
                    }
                }
            }
        }
        for(i in actions) {
            actions[i] = plus_minus + actions[i];
        }
        for(i in actions) {
            var action = actions[i];
        }
        return actions;
    };



    // http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    // from user alpha123
    var pad_digits = function(number, digits) { return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number; };

    var format_date = function(date) {
        var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        var formatted = weekday[date.getDay()] + ", " + month[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear() + " at ";
        var am_pm = (date.getHours() > 11) ? "PM" : "AM";
        if(date.getHours() === "0") formatted += "12:";
        else if(date.getHours() === 12) formatted += date.getHours() + ":";
        else if(date.getHours() > 12) formatted += "" + (date.getHours() - 12) + ":";
        else formatted += date.getHours() + ":";
        formatted += pad_digits(date.getMinutes(), 2) + ":" + pad_digits(date.getSeconds(), 2) + " " + am_pm;
        return formatted;
    };
};
