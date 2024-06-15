using System.Globalization;

namespace alpha_labs._01.Configuration.Utilities
{
    public class Converter
    {
        public DateTime ConvertStringToDateTime(string date)
        {
            var dateElements = date.Split('-');
            var year = dateElements[0][2..];
            var month = dateElements[1];
            var day = dateElements[2];

            var formattedDate = month + "-" + day + "-" + year;
            return DateTime.ParseExact(formattedDate, "MM-dd-yy", CultureInfo.InvariantCulture);
        }

        public int ConvertDecimalToPercent(decimal value)
        {
            if (value < 0 || value > 1)
            {
                throw new ArgumentOutOfRangeException(nameof(value), "Value must be between 0 and 1 inclusive.");
            }
            return (int)(value * 100);
        }
    }
}
