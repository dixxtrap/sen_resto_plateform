import 'package:flutter/material.dart';
import 'package:mobile/interfaces/utils/assets_svg.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';

class Alert {
  static info(BuildContext context,
      {String title = "indo", String message = "", Widget? content}) {
    return showDialog(
        context: context,
        useRootNavigator: true,
        builder: (_) => AlertDialog(
            contentPadding: const EdgeInsets.all(0),
            buttonPadding: const EdgeInsets.all(5),
            actionsPadding: const EdgeInsets.all(5),
            iconPadding: const EdgeInsets.all(10),
            titlePadding: const EdgeInsets.all(5),
            insetPadding: const EdgeInsets.all(0),
            title: Text(title),
            iconColor: Colors.teal,
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
            icon: const SvgIcon(
              AssetSvg.bell,
            ),
            content: content ??
                Text(
                  message,
                  textAlign: TextAlign.center,
                )));
  }

  static error(BuildContext context,
      {String title = "Error", String message = ""}) {
    return showDialog(
        context: context,
        builder: (_) => AlertDialog(
            contentPadding: const EdgeInsets.all(5),
            buttonPadding: const EdgeInsets.all(5),
            actionsPadding: const EdgeInsets.all(5),
            iconPadding: const EdgeInsets.all(10),
            titlePadding: const EdgeInsets.all(5),
            insetPadding: const EdgeInsets.all(5),
            shape:
                RoundedRectangleBorder(borderRadius: BorderRadius.circular(5)),
            icon: SvgIcon(
              AssetSvg.shop,
              color: getTheme(context).colorScheme.error,
              size: 50,
            ),
            title: Text(title),
            titleTextStyle: getTextTheme(context)
                .bodyMedium!
                .copyWith(fontWeight: FontWeight.bold),
            content: Text(
              message,
              textAlign: TextAlign.center,
            )));
  }

  static loading(BuildContext context,
      {String title = "Traitement", String message = ''}) {
    return showDialog(
        context: context,
        useSafeArea: true,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
              contentPadding: const EdgeInsets.all(5),
              buttonPadding: const EdgeInsets.all(5),
              actionsPadding: const EdgeInsets.all(5),
              iconPadding: const EdgeInsets.all(10),
              titlePadding: const EdgeInsets.all(5),
              insetPadding: const EdgeInsets.all(5),
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5)),
              icon: TweenAnimationBuilder(
                builder: (BuildContext context, double value, Widget? child) {
                  return const SvgIcon(
                    AssetSvg.favorite,
                    color: kprimary,
                    size: 50,
                  );
                },
                duration: const Duration(microseconds: 30),
                tween: Tween<double>(begin: 0, end: 1),
              ),
              content: const LinearProgressIndicator(),
              title: Text(title),
              titleTextStyle: getTextTheme(context)
                  .bodyMedium!
                  .copyWith(fontWeight: FontWeight.bold),
            ));
  }

  static success(
    BuildContext context, {
    String title = "Felicitation",
    String message = "",
  }) {
    return showDialog(
        context: context,
        barrierDismissible: false,
        builder: (_) => AlertDialog(
              contentPadding: const EdgeInsets.all(5),
              buttonPadding: const EdgeInsets.all(5),
              actionsPadding: const EdgeInsets.all(5),
              iconPadding: const EdgeInsets.all(10),
              titlePadding: const EdgeInsets.all(5),
              insetPadding: const EdgeInsets.all(5),
              title: Text(title),
              titleTextStyle: getTextTheme(context)
                  .bodyMedium!
                  .copyWith(fontWeight: FontWeight.bold),
              actions: [
                ElevatedButton(
                    onPressed: () {
                      Navigator.pop(_);
                    },
                    child: const Text("OK"))
              ],
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(5)),
              icon: const SvgIcon(
                AssetSvg.chart,
                color: Colors.teal,
                size: 50,
              ),
              content: Text(message, textAlign: TextAlign.center),
            ));
  }
}
