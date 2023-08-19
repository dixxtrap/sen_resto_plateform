import 'package:flutter/cupertino.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';

class Setting extends StatefulWidget {
  Setting({Key? key}) : super(key: key);

  @override
  State<Setting> createState() => _SettingState();
}

class _SettingState extends State<Setting> {
  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 4,
      body: const Center(
        child: Text("setting"),
      ),
    );
  }
}
