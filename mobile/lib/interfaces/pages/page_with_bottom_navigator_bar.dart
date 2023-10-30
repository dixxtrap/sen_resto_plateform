import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/interfaces/pages/bag.dart';
import 'package:mobile/interfaces/pages/profile.dart';
import 'package:mobile/interfaces/pages/restaurant.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/kprint.dart';
import 'package:mobile/interfaces/utils/svg_icon.dart';

import '../component/appbar.dart';
import '../utils/assets_svg.dart';
import 'home.dart';
import 'setting.dart';

class PageWithBottomNavigator extends StatefulWidget {
  const PageWithBottomNavigator(
      {Key? key, required this.body, required this.currentIndex})
      : super(key: key);
  final Widget body;
  final int currentIndex;

  @override
  State<PageWithBottomNavigator> createState() =>
      _PageWithBottomNavigatorState();
}

class _PageWithBottomNavigatorState extends State<PageWithBottomNavigator> {
  int _selectedIndex = 0;

  static List<String> _tabsRoute = <String>[
    "home",
    "search",
    "bag",
    "restaurant",
    "profile",
  ];
  @override
  Widget build(BuildContext context) {
    Color iconColor =
        getTheme(context).colorScheme.onBackground.withOpacity(.7);
    return Scaffold(
      appBar: CustomAppBar(),
      resizeToAvoidBottomInset: true,

      bottomNavigationBar: _tabsRoute.length > widget.currentIndex
          ? BottomNavigationBar(
              selectedItemColor: getTheme(context).colorScheme.onBackground,
              unselectedItemColor: getTheme(context).colorScheme.onBackground,
              selectedLabelStyle: TextStyle(fontWeight: FontWeight.bold),
              // selectedLabelStyle: getTextTheme(context).titleSmall,

              elevation: 12,
              backgroundColor:
                  getTheme(context).colorScheme.error.withOpacity(.7),
              type: BottomNavigationBarType.shifting,
              items: [
                BottomNavigationBarItem(
                  icon: SvgIcon(
                    AssetSvg.home,
                    color: iconColor,
                    size: 22,
                  ),
                  activeIcon: SvgIcon(
                    size: 25,
                    AssetSvg.homeFiil,
                    color: CupertinoTheme.of(context).primaryColor,
                  ),
                  label: 'Home',
                ),
                BottomNavigationBarItem(
                  icon: SvgIcon(
                    AssetSvg.search,
                    color: iconColor,
                    size: 22,
                  ),
                  activeIcon: SvgIcon(
                    AssetSvg.searchFill,
                    color: CupertinoTheme.of(context).primaryColor,
                    size: 25,
                  ),
                  label: 'Recherche',
                ),
                BottomNavigationBarItem(
                  icon: SvgIcon(
                    AssetSvg.map,
                    color: iconColor,
                    size: 22,
                  ),
                  activeIcon: SvgIcon(
                    AssetSvg.mapFill,
                    color: CupertinoTheme.of(context).primaryColor,
                    size: 25,
                  ),
                  label: 'Localisation',
                ),
                BottomNavigationBarItem(
                  icon: SvgIcon(
                    AssetSvg.favorite,
                    color: iconColor,
                    size: 22,
                  ),
                  activeIcon: SvgIcon(
                    AssetSvg.favoriteFill,
                    color: CupertinoTheme.of(context).primaryColor,
                    size: 25,
                  ),
                  label: 'Favories',
                ),
                BottomNavigationBarItem(
                  icon: SvgIcon(
                    AssetSvg.user,
                    color: iconColor,
                    size: 22,
                  ),
                  activeIcon: SvgIcon(
                    AssetSvg.userFill,
                    color: CupertinoTheme.of(context).primaryColor,
                    size: 25,
                  ),
                  label: 'setting',
                ),
              ],
              currentIndex: widget.currentIndex,
              onTap: (index) async {
                kprint(index);
                await Future.delayed(Duration(milliseconds: 300));
                Navigator.pushReplacementNamed(context, _tabsRoute[index]);
              })
          : null,
      body: widget.body,
      // body: (BuildContext context, int index) {
      //   return CupertinoTabView(
      //     builder: (BuildContext context) {
      //       return _tabs[index];
      //     },
      //   );
      // },
    );
  }
}
