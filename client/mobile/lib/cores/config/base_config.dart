/*
 * Copyright ©2022. PayNet Systems. All Rights Reserved.
 */

abstract class BaseConfig {
  String get envName;

  String get baseUrl;

  String get migrationBaseUrl;

  String get imageUrl;

  bool get useHttps;

  bool get trackEvents;

  bool get reportErrors;
}
