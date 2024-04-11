import 'package:flutter/material.dart';
import 'package:mobile/interfaces/base/appbar_state.dart';

class ProductScreen extends StatefulWidget {
  const ProductScreen({Key? key}) : super(key: key);

  @override
  ProductScreenState createState() => ProductScreenState();
}

class ProductScreenState extends AppBarState<ProductScreen> {
  @override
  Widget contentView(BuildContext context) {
    return Container();
  }
}
