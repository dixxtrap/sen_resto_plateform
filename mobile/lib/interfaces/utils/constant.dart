import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

ThemeData getTheme(context) => Theme.of(context);
double getWidth(context) => MediaQuery.of(context).size.width;
double getHeight(context) => MediaQuery.of(context).size.height;
TextTheme getTextTheme(context) => Theme.of(context).textTheme;
Color onBackground(context) => Theme.of(context).colorScheme.onBackground;
Color background(context) => Theme.of(context).colorScheme.background;

const double kpadding = 20;
const kprimary = Color(0xFFE91E63);
final RoundedRectangleBorder roundedButton =
    RoundedRectangleBorder(borderRadius: BorderRadius.circular(kpadding / 4));
Color borderColor(context) => onBackground(context).withOpacity(.1);
