using System;

namespace BurBsNaBaLaDa.Models
{
    public class ExtensionMethodsMessage
    {
        public static String Default(String MSG)
        {
            return String.Format("ERROR: {0}", MSG);
        }
    }

    public class ConvertExtensionException : Exception
    {
        public ConvertExtensionException() : base(ExtensionMethodsMessage.Default("This object could not be converted!")) { }
    }
}
