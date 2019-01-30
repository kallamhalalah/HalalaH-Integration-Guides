using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

using EmvQrCode;

namespace TestWebApplication
{
    public partial class WebForm1 : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Qrcode qr = new Qrcode();

            qr.Merchant_category_code = "5812";
            qr.Merchant_name = "Halalah Grocery";
            qr.Merchant_city = "Riyadh";
            qr.Postal_code = "12345";
            qr.Merchant_name_ar = "هللة";
            qr.Merchant_city_ar = "الرياض";
            qr.Amount = ".50";
            qr.Bill = "1233111";
            qr.Reference = "Unique_Order_ID";
            qr.Terminal = "HG00001";
            
            Response.Write(qr.output());

        }
    }
}