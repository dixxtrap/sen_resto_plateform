import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:mobile/application.dart';
import 'package:mobile/interfaces/pages/login.dart';
import 'package:mobile/interfaces/pages/search.dart';
import 'package:mobile/interfaces/pages/set_otp/set_opt.dart';
import 'package:mobile/interfaces/pages/set_phone/set_phone.dart';
import 'package:mobile/interfaces/pages/splash_screen/splash_screen.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';

import 'cores/services/navigation/navigation_service.dart';
import 'interfaces/pages/home/home.dart';
import 'interfaces/pages/bag.dart';
import 'interfaces/pages/init_page.dart';
import 'interfaces/pages/restaurant.dart';
import 'interfaces/pages/setting.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Application().init();
  await EasyLocalization.ensureInitialized();
  runApp(EasyLocalization(
    path: 'assets/translations',
    saveLocale: true,
    fallbackLocale: const Locale('fr'),
    startLocale: const Locale('fr'),
    supportedLocales: const [Locale('fr'), Locale('en')],
    child: const MyApp(),
  ));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Sen Resto',
      debugShowCheckedModeBanner: false,
      localizationsDelegates: context.localizationDelegates,
      supportedLocales: context.supportedLocales,
      locale: context.locale,
      navigatorKey: locator<Navigation>().navigatorKey,
      theme: ThemeData.from(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            primary: ColorResources.PRIMARY_APP_COLOR,
            seedColor: ColorResources.PRIMARY_APP_COLOR,
            brightness: Brightness.light,
          )),
      themeMode: ThemeMode.light,

      darkTheme: ThemeData.from(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
              primary: ColorResources.PRIMARY_APP_COLOR,
              seedColor: Color.fromARGB(255, 226, 53, 111),
              brightness: Brightness.dark,
              background: Color.fromARGB(255, 0, 0, 0))),
      // darkTheme: ThemeData.from(
      //     useMaterial3: true,
      //     colorScheme: ColorScheme.fromSeed(
      //       seedColor: Colors.pink,
      //       brightness: Brightness.dark,
      //       background: const Color(0xFFf7f7f7),
      //     )),
      // useMaterial3: true,
      home: SplashScreen(),
      routes: {
        "home": (context) => Home(),
        "search": (context) => const Search(),
        "restaurant": (context) => Restaurant(),
        "bag": (context) => const Bag(),
        "login": (context) => Login(),
        "profile": (context) => Setting(),
        "set_phone": (context) => SetPhone(),
      },
    );
  }
}
