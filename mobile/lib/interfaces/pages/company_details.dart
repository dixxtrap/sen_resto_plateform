import 'dart:ffi';
import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/cores/env.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/interfaces/component/appbar.dart';
import 'package:mobile/interfaces/component/custom_box.dart';
import 'package:mobile/interfaces/component/resto_item.dart';
import 'package:mobile/interfaces/utils/assets_svg.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';

class CompanyDetails extends StatefulWidget {
  CompanyDetails({Key? key, required this.company}) : super(key: key);
  final Company company;
  @override
  State<CompanyDetails> createState() => _CompanyDetailsState();
}

class _CompanyDetailsState extends State<CompanyDetails> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: CustomAppBar(),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.max,
          children: [
            SizedBox(
              height: kpadding,
            ),
            Stack(
              children: [
                Positioned(
                  bottom: 0,
                  height: 130,
                  child: Container(
                    width: getWidth(context) * .9,
                    margin: EdgeInsets.symmetric(
                        horizontal: getWidth(context) * .05),
                    padding: const EdgeInsets.all(8.0),
                    decoration: BoxDecoration(
                        color: kprimary,
                        borderRadius: BorderRadius.vertical(
                            top: Radius.elliptical(100, 50),
                            bottom: Radius.circular(20))),
                  ),
                ),
                Container(
                  width: getWidth(context) * .9,
                  margin:
                      EdgeInsets.symmetric(horizontal: getWidth(context) * .05),
                  padding: const EdgeInsets.all(8.0),
                  decoration: BoxDecoration(
                      color: kprimary.withOpacity(0),
                      borderRadius: BorderRadius.circular(kpadding / 4)),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Container(
                        width: getWidth(context) * .8 * .4,
                        height: getWidth(context) * .8 * .4,
                        decoration: BoxDecoration(
                            boxShadow: [BoxShadow()],
                            image: DecorationImage(
                                image: NetworkImage(
                                    "${Env.fileBase}/${widget.company.profile!.id}"),
                                fit: BoxFit.fill),
                            borderRadius: BorderRadius.circular(10)),
                        child: ClipRRect(
                          borderRadius: BorderRadius.circular(10),
                          child: BackdropFilter(
                            filter: ImageFilter.blur(
                                sigmaX: 10,
                                sigmaY: 10,
                                tileMode: TileMode.repeated),
                            child: Container(
                              height: 200,
                              decoration: BoxDecoration(
                                  gradient: LinearGradient(
                                      begin: Alignment.topCenter,
                                      end: Alignment.bottomCenter,
                                      colors: [
                                    getTheme(context).cardColor.withOpacity(.4),
                                    getTheme(context)
                                        .primaryColor
                                        .withOpacity(.17),
                                  ])),
                              child: Image.network(
                                  "${Env.fileBase}/${widget.company.profile!.id}",
                                  fit: BoxFit.contain),
                            ),
                          ),
                        ),
                      ),
                      Text(
                        widget.company.shortName!,
                        style: getTextTheme(context).bodyMedium!.copyWith(
                            color: Colors.white,
                            fontSize: 20,
                            fontWeight: FontWeight.bold),
                      ),
                      Text(widget.company.name!,
                          style: getTextTheme(context).bodyMedium!.copyWith(
                              color: Colors.white,
                              fontSize: 14,
                              fontWeight: FontWeight.w300)),
                      Wrap(
                        direction: Axis.horizontal,
                        runSpacing: 20,
                        children: [
                          Text("${widget.company.restaurants!.length}",
                              style: getTextTheme(context).bodyMedium!.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white)),
                          SvgIcon(
                            AssetSvg.shop,
                            size: 18,
                            color: Colors.white,
                          ),
                          SizedBox(
                            width: kpadding * 2,
                          ),
                          Text("${widget.company.restaurants!.length}",
                              style: getTextTheme(context).bodyMedium!.copyWith(
                                  fontWeight: FontWeight.bold,
                                  color: Colors.white)),
                          SvgIcon(
                            AssetSvg.like,
                            color: Colors.white,
                            size: 18,
                          ),
                        ],
                      )
                    ],
                  ),
                ),
              ],
            ),
            SizedBox(
              height: kpadding,
            ),
            CustomBox(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      height: kpadding / 4,
                    ),
                    Text(
                      "Contact",
                      style: getTextTheme(context)
                          .bodyMedium!
                          .copyWith(fontWeight: FontWeight.bold, fontSize: 18),
                    ),
                    SizedBox(
                      height: kpadding / 8,
                    ),
                    RowItemBetween(
                      label: "Telephone",
                      value: widget.company.phone!,
                    ),
                    Divider(
                      color: onBackground(context).withOpacity(.1),
                    ),
                    RowItemBetween(
                      label: "Email",
                      value: widget.company.email!,
                    ),
                    Divider(
                      color: onBackground(context).withOpacity(.1),
                    ),
                    RowItemBetween(
                      label: "Adresse",
                      value: widget.company.address!,
                    ),
                    SizedBox(
                      height: kpadding / 4,
                    ),
                  ]),
            ),
            CustomBox(
              child: Column(
                  mainAxisAlignment: MainAxisAlignment.start,
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    SizedBox(
                      height: kpadding / 4,
                    ),
                    Text(
                      "Description",
                      style: getTextTheme(context)
                          .bodyMedium!
                          .copyWith(fontWeight: FontWeight.bold, fontSize: 18),
                    ),
                    SizedBox(
                      height: kpadding / 8,
                    ),
                    Text(widget.company.description!),
                    SizedBox(
                      height: kpadding / 4,
                    ),
                  ]),
            ),
            CustomBox(
                child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                SizedBox(
                  height: kpadding / 4,
                ),
                Text(
                  "Restaurant",
                  style: getTextTheme(context)
                      .bodyMedium!
                      .copyWith(fontWeight: FontWeight.bold, fontSize: 18),
                ),
                SizedBox(
                  height: kpadding / 8,
                ),
                Wrap(
                  runSpacing: kpadding / 2,
                  spacing: kpadding / 2,
                  children: widget.company.restaurants!
                      .map((e) => Row(
                            children: [
                              ImageItem(
                                  height: 40,
                                  width: 40,
                                  id: widget.company.shortName == "SR"
                                      ? e.profile!.id!
                                      : widget.company.profile!.id!),
                              SizedBox(
                                width: kpadding / 4,
                              ),
                              Column(
                                mainAxisAlignment: MainAxisAlignment.start,
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Row(
                                    children: [
                                      Text(
                                        e.name!,
                                        style: getTextTheme(context)
                                            .bodyMedium!
                                            .copyWith(
                                                fontWeight: FontWeight.bold),
                                      ),
                                      SizedBox(
                                        width: kpadding,
                                      ),
                                      Text(
                                        "${e.openingTime!.substring(0, 5)}/${e.closingTime!.substring(0, 5)}",
                                        style: getTextTheme(context)
                                            .bodySmall!
                                            .copyWith(
                                                color: onBackground(context)
                                                    .withOpacity(.7)),
                                      )
                                    ],
                                  ),
                                  Text(e.address!,
                                      style: getTextTheme(context)
                                          .bodySmall!
                                          .copyWith(
                                              color: onBackground(context)
                                                  .withOpacity(.7))),
                                ],
                              )
                            ],
                          ))
                      .toList(),
                ),
                SizedBox(
                  height: kpadding / 4,
                ),
              ],
            )),
            SizedBox(
              height: kpadding,
            ),
          ],
        ),
      ),
    );
  }
}
