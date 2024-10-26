import 'package:flutter/cupertino.dart';

import '../component/appbar.dart';

class Profile extends StatefulWidget {
  Profile({Key? key}) : super(key: key);

  @override
  State<Profile> createState() => _ProfileState();
}

class _ProfileState extends State<Profile> {
  @override
  Widget build(BuildContext context) {
    return CupertinoPageScaffold(
      navigationBar: const CustomAppBar(),
      child: Center(
          child: Text(
        "Profile",
        textScaleFactor: 1.5,
      )),
    );
  }
}
