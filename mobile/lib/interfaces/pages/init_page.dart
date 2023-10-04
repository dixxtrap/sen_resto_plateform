import 'package:flutter/material.dart';
import 'package:mobile/interfaces/utils/assets_svg.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/kprint.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';
import 'package:mobile/session.dart';

class WelcomMessage {
  String asset;
  String title;
  String message;
  WelcomMessage(
      {required this.asset, required this.message, required this.title});
}

List<WelcomMessage> wishs = [
  WelcomMessage(
      asset: AssetSvg.chef,
      message: "Cuisine de Qualite",
      title: "Cuisine de Qualite"),
  WelcomMessage(
      asset: AssetSvg.takeAway,
      message: "Livraison",
      title: "Livraison Rapide"),
  WelcomMessage(
      asset: AssetSvg.bestOffer,
      message: "Des Plats de variete",
      title: "Livraison Rapide"),
];

class InitPage extends StatefulWidget {
  const InitPage({Key? key}) : super(key: key);

  @override
  State<InitPage> createState() => _InitPageState();
}

class _InitPageState extends State<InitPage> {
  final pageViewCtr = PageController(initialPage: 0);
  int index = 0;
  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    WidgetsBinding.instance.addPostFrameCallback((timeStamp) {
      _onStart();
    });
  }

  _onStart() {
    Session.loadData();
    if (Session.stateOfKyc == StateOfKyc.initiate) {
    } else if (Session.stateOfKyc != StateOfKyc.initiate) {
      Navigator.pushReplacementNamed(
        context,
        "home",
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: Column(
          children: [
            const SizedBox(
              height: kpadding * 5,
            ),
            Text(
              "Sen Resto",
              textScaleFactor: 1.8,
              style: getTextTheme(context).bodyMedium!.copyWith(
                  fontWeight: FontWeight.w800,
                  fontFamily: "italic",
                  color: kprimary,
                  fontSize: 20),
            ),
            const SizedBox(
              height: kpadding * 3,
            ),
            SizedBox(
              height: getHeight(context) * .4,
              child: PageView.builder(
                controller: pageViewCtr,
                onPageChanged: (value) {
                  kprint(value);
                  index = value;
                  setState(() {});
                },
                itemCount: wishs.length,
                itemBuilder: (context, index) => WishWidget(wish: wishs[index]),
              ),
            ),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                IconButton.filled(
                  onPressed: index == 0
                      ? null
                      : () {
                          kprint(
                              "-----------------------previous--------------------");

                          pageViewCtr.jumpToPage(
                            index - 1,
                          );
                          setState(() {});
                        },
                  icon: RotatedBox(
                    quarterTurns: 2,
                    child: SvgIcon(
                      AssetSvg.chevronFill,
                      color: Colors.white,
                    ),
                  ),
                ),
                Row(
                  children: List.generate(
                      3,
                      (i) => AnimatedContainer(
                            margin: EdgeInsets.all(kpadding / 3),
                            duration: Duration(milliseconds: 500),
                            decoration: BoxDecoration(
                                borderRadius: BorderRadius.circular(20),
                                color: index == i
                                    ? kprimary
                                    : getTheme(context).dividerColor),
                            width: index == i ? 30 : 10,
                            height: 10,
                          )),
                ),
                IconButton.filled(
                  onPressed: index == 2
                      ? null
                      : () {
                          kprint("----------------next--------------$index");
                          pageViewCtr.jumpToPage((index + 1));
                        },
                  icon: SvgIcon(
                    AssetSvg.chevronFill,
                    color: Colors.white,
                  ),
                ),
              ],
            ),
            SizedBox(
              height: kpadding * 2,
            ),
            ElevatedButton(
                onPressed: () {
                  Navigator.of(context).pushReplacementNamed("set_phone");
                },
                child: Text("skip"))
          ],
        ),
      ),
    );
  }
}

class WishWidget extends StatelessWidget {
  const WishWidget({Key? key, required this.wish}) : super(key: key);
  final WelcomMessage wish;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          decoration: BoxDecoration(
              gradient: SweepGradient(colors: [
                getTheme(context).primaryColor.withOpacity(.004),
                getTheme(context).primaryColor.withOpacity(.3)
              ]),
              shape: BoxShape.circle),
          child: SvgIcon(
            wish.asset,
            size: getHeight(context) * .25,
          ),
        ),
        SizedBox(
          height: kpadding * 2,
        ),
        Text(
          wish.title,
          style: getTextTheme(context)
              .bodyLarge!
              .copyWith(fontWeight: FontWeight.bold),
        ),
        Text(wish.message),
      ],
    );
  }
}
