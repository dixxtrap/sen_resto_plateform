import 'package:flutter/material.dart';
import 'package:flutter_svg/svg.dart';
import 'package:mobile/cores/services/preferences_service.dart';
import 'package:mobile/locator.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/helper/assets_img.dart';
import 'package:mobile/utils/helper/assets_svg.dart';
import 'package:mobile/utils/helper/constant.dart';
import 'package:mobile/utils/helper/svg_icon.dart';
import 'package:mobile/utils/style.dart';
import 'package:pretty_qr_code/pretty_qr_code.dart';

class AppCardWallet extends StatefulWidget {
  const AppCardWallet({super.key});

  @override
  State<AppCardWallet> createState() => _AppCardWalletState();
}

class _AppCardWalletState extends State<AppCardWallet> {
  String? token;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      locator<PreferencesService>().phone.then((value) {
        token = value!;
        setState(() {});
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 200,
      width: double.maxFinite - 20,
      decoration: BoxDecoration(
          boxShadow: [
            BoxShadow(
                blurRadius: 20,
                color: ColorResources.BLACK26_COLOR,
                blurStyle: BlurStyle.outer,
                offset: Offset.fromDirection(.6, 6))
          ],
          borderRadius: BorderRadius.circular(20),
          color: ColorResources.SECONDARY_APP_COLOR.withOpacity(1)),
      margin: EdgeInsets.all(10),
      child: Stack(
        children: [
          Align(
            alignment: Alignment.topRight,
            child: ClipRRect(
              borderRadius: BorderRadius.only(topRight: Radius.circular(20)),
              child: SvgPicture.asset(
                AssetSvg.shape1,
                height: 100,
                color: ColorResources.PRIMARY_APP_COLOR,
                width: double.infinity,
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomLeft,
            child: ClipRRect(
              borderRadius: BorderRadius.horizontal(left: Radius.circular(20)),
              child: SvgPicture.asset(
                AssetSvg.shape2,
                height: 200,
                width: double.infinity,
              ),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(kSpaceM),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(
                  "Djiga Salane",
                  style: AppStyle.poppinsRegular(
                      fontSize: 24, color: ColorResources.WHITE_COLOR),
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      child: Column(
                          mainAxisAlignment: MainAxisAlignment.start,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              'Customer Simple',
                              style: AppStyle.poppinsRegular(
                                  color: ColorResources.WHITE_COLOR),
                            ),
                            Text(
                              '10000 F CFA',
                              style: AppStyle.poppinsBold(
                                  fontSize: 24,
                                  color: ColorResources.WHITE_COLOR),
                            ),
                          ]),
                    ),
                    if (token != null)
                      SizedBox(
                        height: 120,
                        child: PrettyQrView(
                          decoration: const PrettyQrDecoration(
                            shape: PrettyQrSmoothSymbol(
                              color: ColorResources.WHITE_COLOR,
                            ),
                            image: PrettyQrDecorationImage(
                              image: AssetImage(AssetImg.compnay),
                            ),
                          ),
                          qrImage: QrImage(QrCode.fromData(
                              data: token!, errorCorrectLevel: 3)),
                        ),
                      )
                  ],
                )
              ],
            ),
          ),
        ],
      ),
    );
  }
}
