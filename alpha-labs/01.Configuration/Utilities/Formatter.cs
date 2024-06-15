namespace alpha_labs._01.Configuration.Utilities
{
    public class Formatter
    {
        public string FormatDateString(string date)
        {
            var dateElements = date.Split('-');
            var year = dateElements[0][2..];
            var month = dateElements[1];
            var day = dateElements[2];

            var formattedDate = month + "/" + day + "/" + year;

            if (formattedDate[0] == '0')
            {
                return formattedDate[1..];
            }
            return formattedDate;
        }

        public string FormatDateTime(DateTime date)
        {
            var dateString = date.ToString();

            // implement

            return dateString;
        }
    }
}
