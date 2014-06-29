/**
 * App configuration
 * @author Martin Vach
 */

var config_module = angular.module('appConfig', []);
var config_data = {
  'cfg': {
    'app_name': 'Z-Wave',
    'app_version': '0.1',
    'server_url': '',
    'lang': 'en',
    'product_images': 'images/products/',
    'product_images_s': 'images/products/sm/',
    'product_images_m': 'images/products/md/',
    'product_images_l': 'images/products/lg/',
    'manufacturer_images': 'images/',
    'category_images': 'images/categories/',
    'manuals': 'man/',
    'page_results': 12,
    'download': 'http://www.zwave.eu/api/user.php',
    'pdf_manual': 'http://www.zwave.eu/api/pdf.php?type=manual&id=',
    'pdf_product_detail': 'http://www.zwave.eu/api/pdf.php?type=product'
    
  }
};
angular.forEach(config_data,function(key,value) {
  config_module.constant(value,key);
});