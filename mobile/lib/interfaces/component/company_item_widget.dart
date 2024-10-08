import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/cores/env.dart';
import 'package:mobile/cores/model/company.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/svg_icon.dart';

import '../../utils/color_ressources.dart';
import '../pages/company_details.dart';
import 'package:mobile/utils/helper/constant.dart';

class CompanyItemWidget extends StatelessWidget {
  const CompanyItemWidget({super.key, required this.company});
  final Company company;
  @override
  Widget build(BuildContext context) {
    return Container(
      margin: const EdgeInsets.all(5),
      decoration: BoxDecoration(
          color: ColorResources.PRIMARY_APP_COLOR.withOpacity(.99),
          borderRadius: BorderRadius.circular(kpadding / 4),
          border:
              Border.all(color: getTheme(context).primaryColor.withOpacity(.1)),
          boxShadow: [
            BoxShadow(
                color: getTheme(context).dividerColor.withOpacity(.3),
                blurStyle: BlurStyle.outer,
                blurRadius: 4)
          ]),
      child: InkWell(
        onTap: () {
          Navigator.of(context).push(
            MaterialPageRoute<void>(
              builder: (BuildContext context) =>
                  CompanyDetails(company: company),
            ),
          );
        },
        // style: FilledButton.styleFrom(
        //     backgroundColor: getTheme(context).dividerColor.withOpacity(.1),
        //     elevation: 0,
        //     shadowColor: getTheme(context).primaryColor.withOpacity(.6),
        //     padding: EdgeInsets.symmetric(
        //         vertical: kpadding / 8, horizontal: kpadding / 8),
        //     shape: RoundedRectangleBorder(
        //         borderRadius: BorderRadius.circular(kpadding / 4))),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.start,
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            const SizedBox(
              width: kpadding / 4,
            ),
            Container(
              width: 80,
              height: 80,
              decoration: BoxDecoration(
                  boxShadow: const [BoxShadow()],
                  image: DecorationImage(
                      image: NetworkImage("${company.imagePath}"),
                      fit: BoxFit.fill),
                  borderRadius: BorderRadius.circular(10)),
              child: ClipRRect(
                borderRadius: BorderRadius.circular(10),
                child: BackdropFilter(
                  filter: ImageFilter.blur(
                      sigmaX: 10, sigmaY: 10, tileMode: TileMode.repeated),
                  child: Container(
                    height: 200,
                    decoration: BoxDecoration(
                        gradient: LinearGradient(
                            begin: Alignment.topCenter,
                            end: Alignment.bottomCenter,
                            colors: [
                          getTheme(context).cardColor.withOpacity(.4),
                          getTheme(context).primaryColor.withOpacity(.17),
                        ])),
               
                  ),
                ),
              ),
            ),
            const SizedBox(
              width: 10,
            ),
            Column(
                mainAxisSize: MainAxisSize.max,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(
                    width: getWidth(context) * .8 - 100,
                    child: Text(
                      company.name!,
                      maxLines: 1,
                      overflow: TextOverflow.clip,
                      style: getTextTheme(context).bodySmall!.copyWith(
                          fontWeight: FontWeight.bold,
                          fontSize: 20,
                          color: Colors.white),
                    ),
                  ),
                  const SizedBox(
                    height: kpadding / 4,
                  ),
                  SizedBox(
                    width: getWidth(context) * .8 - 120,
                    child: Text(
                      company.description!,
                      textAlign: TextAlign.start,
                      overflow: TextOverflow.ellipsis,
                      maxLines: 2,
                      style: getTextTheme(context).labelSmall!.copyWith(
                          fontWeight: FontWeight.w400, color: Colors.white70),
                    ),
                  ),
                  Wrap(
                    children: [
                      const SvgIcon(
                        AssetSvg.shop,
                        color: Colors.white,
                        size: 18,
                      ),
                      Text("{company.restaurants!.length}",
                          style: getTextTheme(context).bodyMedium!.copyWith(
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                              )),
                      const SizedBox(
                        width: kpadding * 2,
                      ),
                      const SvgIcon(
                        AssetSvg.like,
                        color: Colors.white,
                        size: 18,
                      ),
                      Text("{company.restaurants!.length!}",
                          style: getTextTheme(context).bodyMedium!.copyWith(
                                fontWeight: FontWeight.w800,
                                color: Colors.white,
                              )),
                    ],
                  )
                ])
          ],
        ),
      ),
    );
  }
}
