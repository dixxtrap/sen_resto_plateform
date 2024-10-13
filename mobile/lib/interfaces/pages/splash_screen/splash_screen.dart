import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/services/navigation/navigation_service.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/interfaces/component/title.dart';
import 'package:mobile/interfaces/pages/home/home.dart';
import 'package:mobile/interfaces/pages/set_phone/set_phone.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/helper/svg_icon.dart';
import 'package:mobile/utils/style.dart';

import '../../../locator.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) async {
      await Future.delayed(const Duration(milliseconds: 2));
      _onStart();
    });
  }

  _onStart() async {
    if (await locator<PreferencesService>().isLogIn) {
      locator<Navigation>().pushAndRemoveUntil(const Home());
    } else if (await locator<PreferencesService>().setup ==
        StateOfSetup.registered.name) {
      // Navigator.of(context).pushReplacementNamed("set_phone");
      locator<Navigation>().pushReplacement(SetPhone());
    } else if (await locator<PreferencesService>().setup ==
        StateOfSetup.otpVerified) {
      Navigator.pushReplacementNamed(
        context,
        "set_otp",
      );
    } else {
      locator<Navigation>().pushReplacement(SetPhone());
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: ColorResources.PRIMARY_APP_COLOR,
        toolbarHeight: 0,
      ),
      body: Container(
        height: getHeight(context),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Center(
              child: const SvgIcon(
                AssetSvg.logo,
                size: 150,
              ),
            ),
            SizedBox(
              height: kSpaceM,
            ),
            Text(
              "Sen Rest'O",
              style: AppStyle.poppinsBold(fontSize: 50),
            )
          ],
        ),
      ),
    );
  }
}
