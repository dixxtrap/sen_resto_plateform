import 'package:flutter/material.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/interfaces/base/appbar_state.dart';

class RestaurantScreen extends StatefulWidget {
  const RestaurantScreen({Key? key, required this.partner}) : super(key: key);
  final Company partner;
  @override
  RestaurantScreenState createState() => RestaurantScreenState();
}

class RestaurantScreenState extends AppBarState<RestaurantScreen> {
  @override
  Widget contentView(BuildContext context) {
    // TODO: implement contentView
    return Container();
  }
}
