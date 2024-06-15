namespace alpha_labs._01.Configuration.ActionResponse
{
    public class ActionResponse
    {
        public bool IsSuccess { get; set; }

        public string? ErrorMessage { get; set; }
    }

    public class PassingAR : ActionResponse
    {
        public PassingAR()
        {
            IsSuccess = true;
        }
    }

    public class FailingAR : ActionResponse
    {
        public FailingAR()
        {
            IsSuccess = false;
            ErrorMessage = string.Empty;
        }

        public FailingAR(string errorMessage)
        {
            IsSuccess = false;
            ErrorMessage = errorMessage;
        }
    }
}
