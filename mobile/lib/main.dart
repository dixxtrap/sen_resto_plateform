import 'package:flutter/material.dart';
import "package:flutter_riverpod/flutter_riverpod.dart";
import 'package:mobile/interfaces/pages/login.dart';
import 'package:mobile/interfaces/pages/search.dart';
import 'package:mobile/interfaces/pages/set_opt.dart';
import 'package:mobile/interfaces/pages/set_phone.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'interfaces/pages/home.dart';
import 'interfaces/pages/bag.dart';
import 'interfaces/pages/init_page.dart';
import 'interfaces/pages/restaurant.dart';
import 'interfaces/pages/setting.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return ProviderScope(
        child: MaterialApp(
      title: 'Sen Resto',
      debugShowCheckedModeBanner: false,

      theme: ThemeData.from(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
            primary: kprimary,
            seedColor: Color.fromARGB(255, 226, 53, 111),
            brightness: Brightness.light,
          )),
      themeMode: ThemeMode.system,

      darkTheme: ThemeData.from(
          useMaterial3: true,
          colorScheme: ColorScheme.fromSeed(
              primary: kprimary,
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
      home: InitPage(),
      routes: {
        "home": (context) => Home(),
        "search": (context) => const Search(),
        "restaurant": (context) => Restaurant(),
        "bag": (context) => Bag(),
        "login": (context) => Login(),
        "profile": (context) => Setting(),
        "set_phone": (context) => SetPhone(),
        "set_otp": (context) => SetOtp()
      },
    ));
  }
}
