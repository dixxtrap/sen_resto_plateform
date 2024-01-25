import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:mobile/cores/env.dart';
import 'package:mobile/cores/model/plat.dart';
import 'package:mobile/interfaces/component/appbar.dart';
import 'package:mobile/interfaces/component/resto_item.dart';
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
  int quantity = 1;
  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: const CustomAppBar(),
        body: SizedBox(
          height: getHeight(context),
          child: Column(
            children: [
              SizedBox(
                height: getHeight(context) - 150,
                child: SingleChildScrollView(
                  padding: const EdgeInsets.all(0),
                  child: Column(
                    children: [
                      Padding(
                        padding: const EdgeInsets.symmetric(
                            horizontal: kpadding, vertical: kpadding / 2),
                        child: Row(
                          children: [
                            // Text("${widget.plate.restaurant!.profile!.id}"),
                            SizedBox(
                              height: 40,
                              child: Image.network(
                                  "${Env.fileBase}/${widget.plate.restaurant!.company!.shortName == "SR" ? widget.plate.restaurant!.profile!.id : widget.plate.restaurant!.company!.profile!.id}"),
                            ),
                            // ImageItem(
                            //   id: widget.plate.restaurant!.company!.shortName ==
                            //           "SR"
                            //       ? widget.plate.restaurant!.profile!.id!
                            //       : widget
                            //           .plate.restaurant!.company!.profile!.id!,
                            //   height: 40,
                            //   width: null,
                            // ),
                            const SizedBox(
                              width: kpadding / 2,
                            ),
                            Text(
                              "${widget.plate.restaurant!.company!.shortName == "SR" ? widget.plate.restaurant!.name : widget.plate.restaurant!.company!.name}",
                              style: getTextTheme(context)
                                  .titleMedium!
                                  .copyWith(fontWeight: FontWeight.bold),
                            )
                          ],
                        ),
                      ),
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
                                  vertical: index == i
                                      ? kpadding * 1.3
                                      : kpadding * 2),
                              duration: const Duration(milliseconds: 200),
                              child: ImageItem(
                                id: widget.plate.file![i].photoId!,
                                height: double.maxFinite,
                                width: double.maxFinite,
                              )),
                        ),
                      ),
                      Padding(
                        padding:
                            const EdgeInsets.symmetric(horizontal: kpadding),
                        child: Column(
                          children: [
                            Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  widget.plate.name!,
                                  style: getTextTheme(context)
                                      .bodyLarge!
                                      .copyWith(fontWeight: FontWeight.w500),
                                ),
                                Text(
                                  "${widget.plate.price} F",
                                  style: getTextTheme(context)
                                      .titleLarge!
                                      .copyWith(
                                          fontWeight: FontWeight.bold,
                                          color: kprimary),
                                ),
                              ],
                            ),
                          ],
                        ),
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
                      ),
                    ],
                  ),
                ),
              ),
              Container(
                height: 75,
                padding: const EdgeInsets.symmetric(horizontal: 10),
                decoration: BoxDecoration(
                    color: getTheme(context).cardColor,
                    borderRadius:
                        const BorderRadius.vertical(top: Radius.circular(10))),
                child: Row(children: [
                  IconButton.filledTonal(
                    style: IconButton.styleFrom(
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10))),
                    onPressed: () {
                      if (quantity > 1) {
                        quantity = quantity - 1;
                        setState(() {});
                      }
                    },
                    icon: const Icon(CupertinoIcons.minus),
                  ),
                  SizedBox(
                    width: 40,
                    child: Text(
                      "$quantity",
                      textAlign: TextAlign.center,
                      style: getTextTheme(context)
                          .bodyLarge!
                          .copyWith(fontWeight: FontWeight.bold, fontSize: 30),
                    ),
                  ),
                  IconButton.filledTonal(
                    style: IconButton.styleFrom(
                        shape: RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(10))),
                    onPressed: () {
                      quantity = quantity + 1;
                      setState(() {});
                    },
                    icon: const Icon(Icons.add),
                  ),
                  const Spacer(),
                  FilledButton(
                      style: FilledButton.styleFrom(
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10))),
                      onPressed: () {},
                      child: const Text("Ajouter au Paigner"))
                ]),
              )
            ],
          ),
        ),
      ),
    );
  }
}
