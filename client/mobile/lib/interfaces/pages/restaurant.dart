import 'package:flutter/material.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';

class Restaurant extends StatefulWidget {
  Restaurant({Key? key}) : super(key: key);

  @override
  State<Restaurant> createState() => _RestaurantState();
}

class _RestaurantState extends State<Restaurant> {
  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 3,
      body: SingleChildScrollView(
          child: Column(
        children: [Text("Restaurant")],
      )),
    );
  }
}
