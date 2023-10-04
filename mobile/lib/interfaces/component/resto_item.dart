import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/cores/env.dart';
import 'package:mobile/cores/model/restaurant.dart';
import 'package:mobile/interfaces/pages/restaurant_details.dart';

import '../utils/constant.dart';

class RestoItem extends StatelessWidget {
  const RestoItem({Key? key, required this.resto}) : super(key: key);
  final Restaurant resto;
  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: () {
        Navigator.pushReplacement(
          context,
          MaterialPageRoute<void>(
            builder: (BuildContext context) => RestoDetails(
              resto: resto,
            ),
          ),
        );
      },
      child: ImageItem(
        id: resto.profile!.id!,
      ),
    );
  }
}

class ImageItem extends StatelessWidget {
  const ImageItem(
      {super.key, required this.id, this.height = 100, this.width = 100});
  final int id;
  final double width;
  final double height;
  @override
  Widget build(BuildContext context) {
    return Container(
      width: width,
      height: height,

      // margin: EdgeInsets.all(kpadding),
      decoration: BoxDecoration(
          color: Colors.white,
          boxShadow: [
            BoxShadow(
                color: Colors.white54,
                blurRadius: 10,
                blurStyle: BlurStyle.outer)
          ],
          image: DecorationImage(
              image: NetworkImage("${Env.fileBase}/${id}"), fit: BoxFit.fill),
          border: Border.all(
              color: getTheme(context).colorScheme.onBackground.withOpacity(.1),
              width: 0.5),
          borderRadius: BorderRadius.circular(10)),
      child: ClipRRect(
        borderRadius: BorderRadius.circular(10),
        child: BackdropFilter(
          filter: ImageFilter.blur(
              sigmaX: 10, sigmaY: 10, tileMode: TileMode.repeated),
          child: Container(
            height: height / 2,
            decoration: BoxDecoration(
                gradient: LinearGradient(
                    begin: Alignment.topCenter,
                    end: Alignment.bottomCenter,
                    colors: [
                  getTheme(context).cardColor.withOpacity(.08),
                  getTheme(context).primaryColor.withOpacity(.03),
                ])),
            child: Image.network("${Env.fileBase}/$id", fit: BoxFit.contain),
          ),
        ),
      ),
    );
  }
}
