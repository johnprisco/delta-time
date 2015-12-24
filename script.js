window.onload = function() {

    // Date(year, month, day, hours, minutes, seconds, milliseconds);
    var current_date = new Date();

    // +1se +1mi +1ho +1da +1mo +1ye
    var addSeconds = function(date, seconds) {
        var new_date = current_date;
        var current_seconds = current_date.getSeconds();
        new_date.setSeconds(current_seconds + seconds);
        return new_date;
    }
    var addMinutes = function(date, minutes) {
        var new_date = current_date;
        var current_minutes = current_date.getMinutes();
        new_date.setMinutes(current_minutes + minutes);
        return new_date;
    }
    var addHours = function(date, hours) {
        var new_date = current_date;
        var current_hours = current_date.getHours();
        new_date.setHours(current_hours + hours);
        return new_date;
    }
    var addDays = function(date, days) {
        var new_date = current_date;
        var current_days = current_date.getDate();
        new_date.setDate(current_days + days);
        return new_date;
    }
    var addMonths = function(date, months) {
        var new_date = current_date;
        var current_months = current_date.getMonth();
        new_date.setMonth(current_months + months);
        return new_date;
    }
    var addYears = function(date, years) {
        var new_date = current_date;
        var current_years = current_date.getFullYear();
        new_date.setFullYear(current_years + years);
        return new_date;
    }

    document.getElementById("submit").onclick = function() {
        current_date = new Date();
        var input = document.getElementById("input").value;
        var actions = parse_input(input);
        var new_date = apply_actions(current_date, actions);
        var output_date = format_date(new_date);
        document.getElementById("output").innerHTML = output_date;
    }

    document.getElementById("input").onkeyup = function(e) {
        if(e.keyCode === 13) document.getElementById("submit").click();
    }

    var translate_time_string = function(time_string) {
        switch(time_string) {
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
                return "da";
            case "MONTH":
            case "MONTHS":
                return "mo";
            case "YEAR":
            case "YEARS":
                return "ye";
            default:
                return "ER";
        }
    }
    var translate_remainder = function(remainder) {
        switch(remainder) {
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
            default:
                return "ER"
        }
    }

    // takes a string input and returns the action array
    var parse_input = function(input) {
        input = input.toUpperCase();
        var input_words = input.split(" ");
        var actions = [];
        var number = "";
        var remainder;
        for(i in input_words) {
            var word = input_words[i];
            if(!isNaN(word)) {
                number = word;
            }
            else {
                var translated_time = translate_time_string(word);
                if(translated_time !== "ER") {
                    actions.push(number + translate_time_string(word));
                    number = "";
                }
                else {
                    remainder = input_words.slice(i - input_words.length).join(" ");
                    break;
                }
            }
        }
        var plus_minus = translate_remainder(remainder);
        for(i in actions) {
            actions[i] = plus_minus + actions[i];
        }
        for(i in actions) {
            var action = actions[i];
        }
        return actions;
    }

    var apply_actions = function(d, actions) {
        var date = d;
        for(i in actions) {
            var action = actions[i];
            var sign, number, time;
            if(action[0] === "+") sign = 1;
            else sign = -1;
            number = sign * parseInt(action.substring(1, action.length - 2));
            time = action.slice(-2);
            switch(time) {
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
                default:
                    break;
            }
        }
        return date;
    }

    // http://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
    // from user alpha123
    var pad_digits = function(number, digits) { return Array(Math.max(digits - String(number).length + 1, 0)).join(0) + number; }

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
    }
}
