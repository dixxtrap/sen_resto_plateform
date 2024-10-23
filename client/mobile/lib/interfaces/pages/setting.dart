import 'package:flutter/cupertino.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/helper/kprint.dart';

class Setting extends StatefulWidget {
  Setting({Key? key}) : super(key: key);

  @override
  State<Setting> createState() => _SettingState();
}

class _SettingState extends State<Setting> {
  String? token;
  @override
  void initState() {
    // TODO: implement initState
    locator<PreferencesService>().token.then((value) {
      kprint('token==============$value');
      token = value;
      setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 4,
      body: Center(
        child: Text(token ?? ''),
      ),
    );
  }
}
