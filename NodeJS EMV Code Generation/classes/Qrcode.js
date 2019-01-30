class Qrcode {
    constructor(inputs_obj) {
        this.inputs_obj = inputs_obj;
    }

    generate(){

        let inputs = this.inputs_obj;

        const utf8 = require('utf8');
        const fs = require('fs');

        let error = '';

        // if (!String.prototype.contains) {
        //         //     String.prototype.contains= function() {
        //         //         return String.prototype.indexOf.apply(this, arguments) !== -1;
        //         //     };
        //         // }

        // cmd_args = process.argv;
        // cmd_i = 0;
        // cmd_args.forEach(function(ky,vl){
        //     cmd_i++;
        //     if(ky.contains('=')){
        //         field_arr = ky.split("=");
        //         inputs[field_arr[0]] = field_arr[1];
        //     }
        // });

        const VERSION = '000201';
        const POI = '010212';
        const HALALAH_ID = '33';
        const HALALAH_GUI = 'sa.halalah';
        const COUNTRY = 'SA';
        const LANG = 'AR';
        const CURRENCY = '682';


        function crc16(str)
        {
            let table = [
                0x0000, 0x1021, 0x2042, 0x3063, 0x4084, 0x50A5, 0x60C6, 0x70E7,
                0x8108, 0x9129, 0xA14A, 0xB16B, 0xC18C, 0xD1AD, 0xE1CE, 0xF1EF,
                0x1231, 0x0210, 0x3273, 0x2252, 0x52B5, 0x4294, 0x72F7, 0x62D6,
                0x9339, 0x8318, 0xB37B, 0xA35A, 0xD3BD, 0xC39C, 0xF3FF, 0xE3DE,
                0x2462, 0x3443, 0x0420, 0x1401, 0x64E6, 0x74C7, 0x44A4, 0x5485,
                0xA56A, 0xB54B, 0x8528, 0x9509, 0xE5EE, 0xF5CF, 0xC5AC, 0xD58D,
                0x3653, 0x2672, 0x1611, 0x0630, 0x76D7, 0x66F6, 0x5695, 0x46B4,
                0xB75B, 0xA77A, 0x9719, 0x8738, 0xF7DF, 0xE7FE, 0xD79D, 0xC7BC,
                0x48C4, 0x58E5, 0x6886, 0x78A7, 0x0840, 0x1861, 0x2802, 0x3823,
                0xC9CC, 0xD9ED, 0xE98E, 0xF9AF, 0x8948, 0x9969, 0xA90A, 0xB92B,
                0x5AF5, 0x4AD4, 0x7AB7, 0x6A96, 0x1A71, 0x0A50, 0x3A33, 0x2A12,
                0xDBFD, 0xCBDC, 0xFBBF, 0xEB9E, 0x9B79, 0x8B58, 0xBB3B, 0xAB1A,
                0x6CA6, 0x7C87, 0x4CE4, 0x5CC5, 0x2C22, 0x3C03, 0x0C60, 0x1C41,
                0xEDAE, 0xFD8F, 0xCDEC, 0xDDCD, 0xAD2A, 0xBD0B, 0x8D68, 0x9D49,
                0x7E97, 0x6EB6, 0x5ED5, 0x4EF4, 0x3E13, 0x2E32, 0x1E51, 0x0E70,
                0xFF9F, 0xEFBE, 0xDFDD, 0xCFFC, 0xBF1B, 0xAF3A, 0x9F59, 0x8F78,
                0x9188, 0x81A9, 0xB1CA, 0xA1EB, 0xD10C, 0xC12D, 0xF14E, 0xE16F,
                0x1080, 0x00A1, 0x30C2, 0x20E3, 0x5004, 0x4025, 0x7046, 0x6067,
                0x83B9, 0x9398, 0xA3FB, 0xB3DA, 0xC33D, 0xD31C, 0xE37F, 0xF35E,
                0x02B1, 0x1290, 0x22F3, 0x32D2, 0x4235, 0x5214, 0x6277, 0x7256,
                0xB5EA, 0xA5CB, 0x95A8, 0x8589, 0xF56E, 0xE54F, 0xD52C, 0xC50D,
                0x34E2, 0x24C3, 0x14A0, 0x0481, 0x7466, 0x6447, 0x5424, 0x4405,
                0xA7DB, 0xB7FA, 0x8799, 0x97B8, 0xE75F, 0xF77E, 0xC71D, 0xD73C,
                0x26D3, 0x36F2, 0x0691, 0x16B0, 0x6657, 0x7676, 0x4615, 0x5634,
                0xD94C, 0xC96D, 0xF90E, 0xE92F, 0x99C8, 0x89E9, 0xB98A, 0xA9AB,
                0x5844, 0x4865, 0x7806, 0x6827, 0x18C0, 0x08E1, 0x3882, 0x28A3,
                0xCB7D, 0xDB5C, 0xEB3F, 0xFB1E, 0x8BF9, 0x9BD8, 0xABBB, 0xBB9A,
                0x4A75, 0x5A54, 0x6A37, 0x7A16, 0x0AF1, 0x1AD0, 0x2AB3, 0x3A92,
                0xFD2E, 0xED0F, 0xDD6C, 0xCD4D, 0xBDAA, 0xAD8B, 0x9DE8, 0x8DC9,
                0x7C26, 0x6C07, 0x5C64, 0x4C45, 0x3CA2, 0x2C83, 0x1CE0, 0x0CC1,
                0xEF1F, 0xFF3E, 0xCF5D, 0xDF7C, 0xAF9B, 0xBFBA, 0x8FD9, 0x9FF8,
                0x6E17, 0x7E36, 0x4E55, 0x5E74, 0x2E93, 0x3EB2, 0x0ED1, 0x1EF0,
            ];


            let crc_16 = 0xFFFF;
            str = str.toString();
            str = utf8.encode(str);
            let len = str.length;

            for (let i = 0; i < len; i++ ) {
                let index = (crc_16 >> 8) ^ decodeURIComponent(escape(str.charAt(i).charCodeAt(0)));
                crc_16 = ((crc_16 << 8) & 0xFFFF) ^ table[index];
            }

            crc_16 = crc_16.toString(16);

            return crc_16.toString();
        }

        /*
         * AUTOMATIC FUNCTIONS
         */
        function add_error(err) {
            error += ', ERROR: ' + err + '.';
            return true;
        }

        function get_length(str){
            str = str.toString();
            let len = str.length;
            if(len <=9){
                return '0'+len;
            }else{
                return ''+len;
            }
        } // end: get_length(str)

        function empty(str){
            switch (str) {
                case typeof this == "undefined":
                case typeof this == undefined:
                case typeof this == "NaN":
                case undefined:
                case "undefined":
                case "NaN":
                case "":
                case null:
                case false:
                    return true;
                default:
                    return false;
            }
        } // end: empty(str)

        function id_len_val(id, val){
            return id + get_length(val) + val;
        } // end: id_len_val(id, val)

        function merchant_account_info(){
            let gui_line = '00'+get_length(HALALAH_GUI)+HALALAH_GUI;

            let merchant_line = '';
            if(!empty(inputs.merchant_id)){
                let merchant_id = inputs.merchant_id;
                merchant_line = '04'+get_length(merchant_id)+merchant_id;
            }

            let branch_line = '';
            if(!empty(inputs.branch_id)){
                let branch_id = inputs.branch_id;
                branch_line = '05'+get_length(branch_id)+branch_id;
            }

            let terminal_line = '';
            if(!empty(inputs.terminal_id)){
                let terminal_id = inputs.terminal_id;
                terminal_line = '06'+get_length(terminal_id)+terminal_id;
            }

            let  z_line = gui_line+merchant_line+branch_line+terminal_line;
            let  mai_len = get_length(z_line);
            let  mai_o = HALALAH_ID+mai_len+z_line;

            return mai_o;
        } // end: merchant_account_info()

        function mmc(){
            if(empty(inputs.merchant_category_code)){
                add_error('MUST ADD MERCHANT CATEGORY CODE');
                return '';
            }else{
                return id_len_val('52', inputs.merchant_category_code);
            }
        } // end: function mmc()

        function country(){
            return id_len_val('58', COUNTRY);
        } // end: function country()

        function merchant_name(){
            if(empty(inputs.merchant_name)){
                add_error('MUST ADD MERCHANT NAME');
                return '';
            }else{
                return id_len_val('59', inputs.merchant_name);
            }
        } // end: function merchant_name()

        function merchant_city(){
            if(!empty(inputs.merchant_city)){
                return id_len_val('60', inputs.merchant_city);
            }
        } // end: function merchant_city()

        function postal_code(){
            if(!empty(inputs.postal_code)){
                return id_len_val('61', inputs.postal_code);
            }
        } // end: function postal_code()

        function local_name_city(){
            let local_line = id_len_val('00', LANG);

            let name_line = '';
            let city_line = '';

            if(!empty(inputs.merchant_name_ar)){
                name_line = id_len_val('01', inputs.merchant_name_ar);
            }
            if(!empty(inputs.merchant_city_ar)){
                city_line = id_len_val('02', inputs.merchant_city_ar);
            }

            let z_line = local_line+name_line+city_line;
            let al_len = get_length(z_line);
            return '64'+al_len+z_line;

        } // end: function local_name_city()

        function amount(){
            if(empty(amount)){
                add_error('MUST ADD AMOUNT');
                return '';
            }else{
                return id_len_val('54', inputs.amount);
            }
        } // end: function amount()

        function currency(){
            return id_len_val('53', CURRENCY);
        } // end: function currency()

        function tip(){
            return '550201';
        } // end: function tip()

        function additional_data(){

            let bill_line = '';
            let mobile_line = '';
            let store_line = '';
            let loyalty_line = '';
            let reference_line = '';
            let consumer_line = '';
            let terminal_line = '';
            let purpose_line = '';
            let request = '';

            if(!empty(inputs.bill)){
                bill_line = id_len_val('01', inputs.bill);
            }
            if(!empty(inputs.mobile)){
                mobile_line = id_len_val('02', inputs.mobile);
            }
            if(!empty(inputs.store)){
                store_line = id_len_val('03', inputs.store);
            }
            if(!empty(inputs.loyalty)){
                loyalty_line = id_len_val('04', inputs.loyalty);
            }
            if(!empty(inputs.reference)){
                reference_line = id_len_val('05', inputs.reference);
            }
            if(!empty(inputs.consumer)){
                consumer_line = id_len_val('06', inputs.consumer);
            }
            if(!empty(inputs.terminal)){
                terminal_line = id_len_val('07', inputs.terminal);
            }
            if(!empty(inputs.purpose)){
                purpose_line = id_len_val('08', inputs.purpose);
            }
            if(!empty(inputs.request)){
                request = id_len_val('09', inputs.request);
            }

            let z_line = bill_line+mobile_line+store_line+loyalty_line+reference_line+consumer_line+terminal_line+purpose_line+request;

            let al_len = get_length(z_line);

            if(!empty(al_len) && !empty(z_line)){
                return '62'+al_len+z_line;
            }
        } // end: function additional_data(val)

        function crc(o){
            let crc_id_len = '6304';
            let crc_4d = crc16(o+crc_id_len);
            return crc_id_len+crc_4d;
        }

        function output(){

            let o = '';

            o += VERSION;
            o += POI;
            o += merchant_account_info();
            o += mmc();
            o += country();
            o += merchant_name();
            o += merchant_city();
            o += postal_code();
            o += local_name_city();
            o += amount();
            o += currency();

            o += additional_data();
            o += crc(o);

            return o;

        } // end:public function output()

        fs.writeFile("./output.txt", output(), function(err) {
            if(err) {
                return console.log(err);
            }

            console.log("data saved to output.txt file");
        });
    }
};

module.exports = Qrcode;