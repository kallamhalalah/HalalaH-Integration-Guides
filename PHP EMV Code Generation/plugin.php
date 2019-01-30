<?php

require_once './classes/Qrcode.php';

$inputs = array(
    "merchant_category_code"=> 5812,
    "merchant_name"=> "Halalah Grocery",
    "merchant_city"=> "Riyadh",
    "postal_code"=> "12345",
    "merchant_name_ar"=> "هللة",
    "merchant_city_ar"=> "الرياض",
    "amount"=> ".50",
    "bill"=> 1233111,
    "reference"=> "Unique_Order_ID",
    "terminal"=> "HG00001"
);

$Qrcode = new Qrcode($inputs);
echo $Qrcode->output();