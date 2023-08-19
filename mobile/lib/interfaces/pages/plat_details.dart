import 'package:flutter/material.dart';
import 'package:mobile/cores/model/plat.dart';
import 'package:mobile/interfaces/component/resto_item.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:mobile/interfaces/utils/constant.dart';

class PlateDetails extends StatefulWidget {
  PlateDetails({Key? key, required this.plate}) : super(key: key);
  Plat plate;
  @override
  State<PlateDetails> createState() => _PlateDetailsState();
}

class _PlateDetailsState extends State<PlateDetails> {
  final pageCtr = PageController(viewportFraction: .85);
  int index = 0;
  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 100,
      body: SingleChildScrollView(
        child: Column(
          children: [
            SizedBox(
              height: getHeight(context) * .4,
              child: PageView.builder(
                controller: pageCtr,
                onPageChanged: (p0) {
                  index = p0;
                  setState(() {});
                },
                itemCount: widget.plate.file?.length,
                itemBuilder: (context, i) => AnimatedContainer(
                    margin: EdgeInsets.symmetric(
                        horizontal: kpadding / 4,
                        vertical: index == i ? kpadding * 1.3 : kpadding * 2),
                    duration: Duration(milliseconds: 200),
                    child: ImageItem(
                      id: widget.plate.file![i].photoId!,
                      height: double.maxFinite,
                      width: double.maxFinite,
                    )),
              ),
            ),
            Text(
              widget.plate.name!,
              style: getTextTheme(context)
                  .titleLarge!
                  .copyWith(fontWeight: FontWeight.bold),
            ),
            Padding(
              padding: const EdgeInsets.all(kpadding),
              child: Text(
                widget.plate.description!,
                textAlign: TextAlign.justify,
                style: getTextTheme(context)
                    .bodySmall!
                    .copyWith(fontWeight: FontWeight.w400),
              ),
            )
          ],
        ),
      ),
    );
  }
}
