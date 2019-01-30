<?php

require_once '../classes/Qrcode.php';

header('Content-Type: application/json');

function isJson($string) {
    json_decode($string);
    return (json_last_error() == JSON_ERROR_NONE);
}
$json_str = file_get_contents('php://input');

if(isJson($json_str)){
    $json_obj = json_decode($json_str);
    if(!isset($json_obj->qr)){
        $Qrcode = new Qrcode($json_obj);
        $output = array('qr'=>$Qrcode->output());
    }else{
        $output = array("Error"=>"qr key only used in revert api");
    }
}else{
    $output = array("Error"=>"Must have valid EmvQrCode Fields In Json Format");
}
echo json_encode($output);