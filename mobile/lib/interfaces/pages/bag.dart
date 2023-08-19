import 'package:flutter/material.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';

class Bag extends StatefulWidget {
  Bag({Key? key}) : super(key: key);

  @override
  State<Bag> createState() => _BagState();
}

class _BagState extends State<Bag> {
  @override
  Widget build(BuildContext context) {
    return const PageWithBottomNavigator(
      currentIndex: 2,
      body: SingleChildScrollView(
        child: Column(children: [Text("Pagner")]),
      ),
    );
  }
}
