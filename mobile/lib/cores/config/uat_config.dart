/*
 * Copyright ©2022. PayNet Systems. All Rights Reserved.
 */

import 'base_config.dart';

class UatConfig implements BaseConfig {
  @override
  // String get baseUrl => '54.234.195.123/';
  String get baseUrl => 'http://54.234.195.123:3000/v1/';

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
