<?php
header('Content-Type: application/json');

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str);

function qr_subs($qrcode_str){
    $output = array();
    while(!empty($qrcode_str)) {
        $id = substr($qrcode_str, 0, 2);
        $length = substr($qrcode_str, 2, 2);
        $content = mb_substr($qrcode_str, 4, (int)$length);
        if(!empty($content)){
            array_push($output, array(
                    'id'=>$id,
                    'length'=>$length,
                    'content'=>$content
                )
            );
        }
        $start_cut = (int)4 + (int)strlen($content);
        $end_cut = (int)strlen($qrcode_str);
        $qrcode_str = substr($qrcode_str, $start_cut, $end_cut);
    }
    return $output;
} // END: function qr_subs($qrcode_str)

$output = array();
if(isset($json_obj->qr)){
    if(!empty($json_obj->qr)){
        $qrcode_str = strip_tags(trim($json_obj->qr));
        $output = qr_subs($qrcode_str);
        foreach($output as $key=>$val){
            $qrcode_str = '';
            $qrcode_str = $output[$key]["content"];
            $output[$key]["sub"] = qr_subs($output[$key]["content"]);
        }
    }else{
        $output = array("Error"=>"Incorrect EmvQrCode String");
    }
}else{
    $output = array("Error"=>"Must have EmvQrCode qr Key In Json Format");
}
echo json_encode($output);