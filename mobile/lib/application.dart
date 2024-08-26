import 'dart:io';

import 'package:easy_localization/easy_localization.dart';
// import 'package:firebase_analytics/firebase_analytics.dart';
// import 'package:firebase_core/firebase_core.dart';
// import 'package:firebase_crashlytics/firebase_crashlytics.dart';
// import 'package:firebase_performance/firebase_performance.dart';
import 'package:flutter/services.dart';
import 'package:mobile/cores/config/environment.dart';
import 'package:mobile/locator.dart';
import 'package:uuid/uuid.dart';
// import 'package:kpay/src/config/environment.dart';
// import 'package:kpay/src/data/models/initial_data.dart';
// import 'package:kpay/src/firebase/fcm/push_notification_service.dart';
// import 'package:kpay/src/utils/log.dart';
// import 'package:uuid/uuid.dart';

// import 'firebase_options.dart';

abstract class FlutterApplication {
  void init();

  // void postLogin(BuildContext context, Profile profile);
}

class Application implements FlutterApplication {
  static final Application _singleton = Application._internal();
  static String? uuid;

  factory Application() {
    return _singleton;
  }

  Application._internal();

  @override
  Future<void> init() async {
    uuid = const Uuid().v4();
    EasyLocalization.logger.enableLevels = [];
    configureLocator();
    const String environment = String.fromEnvironment(
      'ENVIRONMENT',
      defaultValue: Environment.UAT,
    );
    Environment().initConfig(environment);
    // await initFirebase();
    await SystemChrome.setPreferredOrientations([DeviceOrientation.portraitUp]);
    HttpOverrides.global = MyHttpOverrides();
  }

  // Future<void> initFirebase() async {
  //   try {
  //     await Firebase.initializeApp(
  //         options: DefaultFirebaseOptions.currentPlatform);
  //     FlutterError.onError = (errorDetails) {
  //       FirebaseCrashlytics.instance.recordFlutterFatalError(errorDetails);
  //     };
  //     if (kDebugMode) {
  //       await FirebaseCrashlytics.instance
  //           .setCrashlyticsCollectionEnabled(false);
  //     } else {
  //       await FirebaseCrashlytics.instance
  //           .setCrashlyticsCollectionEnabled(true);
  //     }
  //     FirebaseNotificationsManager().initializePlugin();
  //     FirebasePerformance.instance.setPerformanceCollectionEnabled(true);
  //   } catch (e) {
  //     Logger.d(e);
  //     Logger.d("Firebase initialization error");
  //   }
  // }

  // @override
  // Future<void> postLogin(BuildContext context, Profile profile) async {
  //   await FirebaseAnalytics.instance.setUserId(id: profile.mobileNumber);
  //   FirebaseCrashlytics.instance.setCustomKey(
  //     'mobile_number',
  //     "${profile.mobileNumber}",
  //   );
  // }
}

class MyHttpOverrides extends HttpOverrides {
  @override
  HttpClient createHttpClient(SecurityContext? context) {
    return super.createHttpClient(context)
      ..badCertificateCallback =
          (X509Certificate cert, String host, int port) => true;
  }
}
