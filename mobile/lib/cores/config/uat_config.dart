/*
 * Copyright ©2022. PayNet Systems. All Rights Reserved.
 */

import 'base_config.dart';

class UatConfig implements BaseConfig {
  @override
  String get baseUrl => 'https://uatmobile.niookobok.com/rest/';
  // String get baseUrl => 'https://192.168.1.4:9090/rest/';

  @override
  String get imageUrl => 'http://uatadmin.niookobok.com/image?id=';

  @override
  bool get reportErrors => false;

  @override
  bool get trackEvents => false;

  @override
  bool get useHttps => true;

  @override
  String get envName => 'UAT Environment';

  @override
  String get migrationBaseUrl => 'https://devrover.niookobok.com/';
}
