import 'package:easy_localization/easy_localization.dart';
import 'package:flutter/material.dart';
import 'package:mobile/interfaces/component/custom_botton.dart';
import 'package:mobile/utils/color_ressources.dart';
import 'package:mobile/utils/style.dart';

class DialogUtils {
  static pickerDialog(BuildContext context,
      {bool? isKycSelfie, Function()? onCameraClick, Function()? onFileClick}) {
    showGeneralDialog(
      barrierColor: ColorResources.BLACK_COLOR.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        final curvedValue = Curves.easeInOutBack.transform(a1.value) - 1.0;
        return Transform(
          transform: Matrix4.translationValues(0.0, curvedValue * 200, 0.0),
          child: Opacity(
            opacity: a1.value,
            child: AlertDialog(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(12.0),
                ),
              ),
              content: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Column(
                    mainAxisSize: MainAxisSize.min,
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      IconButton(
                        color: ColorResources.PRIMARY_APP_COLOR,
                        icon: Icon(Icons.camera),
                        enableFeedback: true,
                        iconSize: 60,
                        onPressed: () {
                          Navigator.pop(context);
                          if (onCameraClick != null) onCameraClick();
                        },
                      ),
                      Text(tr("Camera"))
                    ],
                  ),
                  //
                  Offstage(
                    offstage: isKycSelfie ?? false,
                    child: Wrap(
                      children: [
                        SizedBox(width: 30),
                        Column(
                          mainAxisSize: MainAxisSize.min,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            IconButton(
                              color: ColorResources.PRIMARY_APP_COLOR,
                              icon: Icon(Icons.insert_drive_file),
                              enableFeedback: true,
                              iconSize: 60,
                              onPressed: () {
                                Navigator.pop(context);
                                if (onFileClick != null) onFileClick();
                              },
                            ),
                            Text(tr("File"))
                          ],
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
          ),
        );
      },
      transitionDuration: const Duration(milliseconds: 500),
      barrierDismissible: true,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }

  static yesNoDialog(BuildContext context,
      {required Function() onYesClick, Function()? onNoClick}) {
    showGeneralDialog(
      barrierColor: ColorResources.BLACK_COLOR.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        final curvedValue = Curves.easeInOutBack.transform(a1.value) - 1.0;
        return Transform(
          transform: Matrix4.translationValues(0.0, curvedValue * 200, 0.0),
          child: Opacity(
            opacity: a1.value,
            child: AlertDialog(
              actions: [
                MaterialButton(
                  padding: EdgeInsets.all(0),
                  onPressed: () {
                    Navigator.pop(context);
                    onYesClick();
                  },
                  child: Text(
                    tr("Yes"),
                  ),
                ),
                MaterialButton(
                  onPressed: () {
                    Navigator.pop(context);
                    onNoClick!();
                  },
                  child: Text(
                    tr("No"),
                  ),
                ),
              ],
              title: Text(
                tr("Are you sure?"),
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(12.0),
                ),
              ),
            ),
          ),
        );
      },
      transitionDuration: const Duration(milliseconds: 500),
      barrierDismissible: true,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }

  static kycDialog(BuildContext context,
      {Function()? onPositiveClick, Function()? onNegativeClick}) {
    showGeneralDialog(
      barrierColor: ColorResources.BLACK_COLOR.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        final curvedValue = Curves.easeInOutBack.transform(a1.value) - 1.0;
        return Transform(
          transform: Matrix4.translationValues(0.0, curvedValue * 200, 0.0),
          child: Opacity(
            opacity: a1.value,
            child: AlertDialog(
              actions: [
                MaterialButton(
                  onPressed: () {
                    Navigator.pop(context);
                    onNegativeClick!();
                  },
                  child: Text(tr("Later")),
                ),
                MaterialButton(
                  padding: EdgeInsets.all(0),
                  onPressed: () {
                    Navigator.pop(context);
                    onPositiveClick!();
                  },
                  child: Text(tr("Now")),
                ),
              ],
              title: Text(
                tr("KYC Pending"),
              ),
              content: Text(
                tr("Your KYC is pending, Please complete the KYC now or later."),
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(
                  Radius.circular(12.0),
                ),
              ),
            ),
          ),
        );
      },
      transitionDuration: const Duration(milliseconds: 500),
      barrierDismissible: false,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }

  static void generalDialog(
    BuildContext context, {
    required Function() onAccept,
    Function()? onDenied,
    required String title,
    required String content,
  }) {
    showGeneralDialog(
      barrierColor: Colors.black.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        return AlertDialog(
          scrollable: true,
          titlePadding: EdgeInsets.zero,
          contentPadding: EdgeInsets.only(left: 24, right: 24, top: 10),
          actions: [
            MaterialButton(
              onPressed: () {
                Navigator.pop(context);

                if (onDenied != null) onDenied();
              },
              child: Text(
                tr("Cancel"),
                style: AppStyle.montserratSemiBold(
                    color: ColorResources.PRIMARY_APP_COLOR),
              ),
            ),
            MaterialButton(
              padding: EdgeInsets.all(0),
              onPressed: () {
                Navigator.pop(context);

                onAccept();
              },
              child: Text(
                tr("Confirm"),
                style: AppStyle.montserratSemiBold(
                    color: ColorResources.PRIMARY_APP_COLOR),
              ),
            ),
          ],
          content: Text(
            content,
            style: AppStyle.poppinsRegular(fontSize: 13),
          ),
          title: ListTile(
            contentPadding: EdgeInsets.only(top: 0, bottom: 0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(12.0),
                topRight: Radius.circular(12),
              ),
            ),
            tileColor: ColorResources.PRIMARY_APP_COLOR,
            title: Text(
              tr(title),
              style: TextStyle(color: Colors.white),
              textAlign: TextAlign.center,
            ),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(12.0),
            ),
          ),
        );
      },
      barrierDismissible: false,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }

  static void kycLimit(
    BuildContext context, {
    Function()? onDenied,
    required String kycStatus,
    required Icon icon,
    required Widget content,
  }) {
    showGeneralDialog(
      barrierColor: Colors.black.withOpacity(0),
      transitionBuilder: (context, a1, a2, widget) {
        return AlertDialog(
          insetPadding: EdgeInsets.only(bottom: 350, left: 10, right: 10),
          scrollable: true,
          titlePadding:
              EdgeInsets.only(left: 20, right: 20, top: 20, bottom: 10),
          contentPadding: EdgeInsets.only(left: 20, right: 20, bottom: 20),
          content: content,
          title: Row(
            children: [
              Expanded(
                child: RichText(
                  text: TextSpan(
                    text: tr("KYC Status : "),
                    style: AppStyle.montserratSemiBold(color: Colors.black),
                    children: [
                      TextSpan(
                        text: kycStatus,
                        style: AppStyle.montserratSemiBold(color: Colors.black),
                      )
                    ],
                  ),
                ),
              ),
              SizedBox(width: 5),
              icon
            ],
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(4.0),
            ),
          ),
        );
      },
      barrierDismissible: true,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }

  static void inputBottomSheet(
      BuildContext context, Function(String title, String remarks) onYesClick) {
    final GlobalKey<FormState> keyTitle = GlobalKey();
    final GlobalKey<FormState> keyRemarks = GlobalKey();
    final TextEditingController controllerTitle = TextEditingController();
    final TextEditingController controllerRemarks = TextEditingController();
    showModalBottomSheet(
      context: context,
      enableDrag: false,
      isScrollControlled: true,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(10),
          topRight: Radius.circular(10),
        ),
      ),
      builder: (_) {
        return Padding(
          padding: MediaQuery.of(context).viewInsets * 0.5,
          child: Container(
            height: 350,
            child: Scaffold(
              backgroundColor: ColorResources.WHITE_COLOR,
              body: Padding(
                padding: const EdgeInsets.only(left: 15, right: 15, top: 8),
                child: Wrap(
                  alignment: WrapAlignment.center,
                  crossAxisAlignment: WrapCrossAlignment.center,
                  children: <Widget>[
                    Container(
                      width: 50,
                      height: 3,
                      decoration: BoxDecoration(
                        color: Colors.grey,
                        borderRadius: BorderRadius.circular(5),
                      ),
                    ),
                    Text(
                      tr("Please enter payment name and remarks to save your payment."),
                      style: AppStyle.poppinsRegular(),
                    ),
                    SizedBox(height: 60),
                    // CustomTextField(
                    //   fieldKey: _keyTitle,
                    //   controller: _controllerTitle,
                    //   textInputType: TextInputType.text,
                    //   textInputAction: TextInputAction.done,
                    //   heading: tr("Payment Name"),
                    //   validator: (value) {
                    //     if (value!.isEmpty)
                    //       return tr("Required");
                    //     else
                    //       return null;
                    //   },
                    // ),

                    SizedBox(height: 90),
                  ],
                ),
              ),
              bottomNavigationBar: Padding(
                padding: const EdgeInsets.only(
                    top: 8.0, right: 70.0, left: 70, bottom: 8.0),
                child: CustomButton(
                  onPressed: () {
                    if (keyTitle.currentState!.validate() &&
                        keyRemarks.currentState!.validate()) {
                      onYesClick(controllerTitle.text, controllerRemarks.text);
                    }
                  },
                  btnText: tr('OK'),
                ),
              ),
            ),
          ),
        );
      },
    );
  }

  static void showErrorDialog(
    BuildContext context, {
    required String error,
  }) {
    showGeneralDialog(
      barrierColor: Colors.black.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        return AlertDialog(
          scrollable: true,
          titlePadding: EdgeInsets.zero,
          contentPadding: EdgeInsets.only(left: 24, right: 24),
          actions: [
            MaterialButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: Text(
                tr("OK"),
                style: AppStyle.poppinsSemiBold(
                    color: ColorResources.PRIMARY_APP_COLOR),
              ),
            ),
          ],
          content: Text(
            tr(error),
            textAlign: TextAlign.start,
            style: AppStyle.poppinsRegular(fontSize: 13),
          ),
          title: ListTile(
              contentPadding: EdgeInsets.all(0),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.only(
                  topLeft: Radius.circular(12.0),
                  topRight: Radius.circular(12),
                ),
              ),
              title: Icon(
                Icons.info_rounded,
                color: ColorResources.PRIMARY_APP_COLOR,
                size: 35,
              )),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(12.0),
            ),
          ),
        );
      },
      barrierDismissible: false,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }

  static sheetDialog({
    required BuildContext context,
    required String title,
    required String message,
    required Function() onPressed,
    String? buttonText,
    Widget Function(BuildContext context)? builder,
    bool isDismissible = true,
  }) {
    showModalBottomSheet(
      context: context,
      enableDrag: false,
      isDismissible: isDismissible,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(10),
          topRight: Radius.circular(10),
        ),
      ),
      builder: builder ??
          (_) {
            return Container(
              padding: const EdgeInsets.all(16),
              height: 200,
              color: Colors.transparent,
              child: Scaffold(
                backgroundColor: Colors.transparent,
                body: Wrap(
                  children: [
                    Text(
                      title,
                      style: AppStyle.poppinsSemiBold(fontSize: 21),
                    ),
                    const SizedBox(height: 40),
                    Text(message),
                  ],
                ),
                bottomNavigationBar: CustomButton(
                    child: Text(buttonText ?? 'Submit'.tr()),
                    onPressed: () {
                      Navigator.pop(context);
                      onPressed();
                    }),
              ),
            );
          },
    );
  }

  static void closureAccountDialog(
    BuildContext context, {
    required Function() onAccept,
    Function()? onDenied,
    required String title,
    required Widget content,
  }) {
    showGeneralDialog(
      barrierColor: Colors.black.withOpacity(0.5),
      transitionBuilder: (context, a1, a2, widget) {
        return AlertDialog(
          scrollable: true,
          titlePadding: EdgeInsets.zero,
          contentPadding: EdgeInsets.only(left: 24, right: 24, top: 10),
          actions: [
            MaterialButton(
              onPressed: () {
                Navigator.pop(context);

                if (onDenied != null) onDenied();
              },
              child: Text(
                tr("Cancel"),
                style: AppStyle.montserratSemiBold(
                    color: ColorResources.PRIMARY_APP_COLOR),
              ),
            ),
            MaterialButton(
              padding: EdgeInsets.all(0),
              onPressed: () {
                Navigator.pop(context);

                onAccept();
              },
              child: Text(
                tr("Confirm"),
                style: AppStyle.montserratSemiBold(
                    color: ColorResources.PRIMARY_APP_COLOR),
              ),
            ),
          ],
          content: content,
          title: ListTile(
            contentPadding: EdgeInsets.all(0),
            shape: RoundedRectangleBorder(
              borderRadius: BorderRadius.only(
                topLeft: Radius.circular(12.0),
                topRight: Radius.circular(12),
              ),
            ),
            tileColor: ColorResources.PRIMARY_APP_COLOR,
            title: Text(
              tr(title),
              style:
                  TextStyle(color: Colors.white, fontWeight: FontWeight.bold),
              textAlign: TextAlign.center,
            ),
          ),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.all(
              Radius.circular(12.0),
            ),
          ),
        );
      },
      barrierDismissible: false,
      barrierLabel: '',
      context: context,
      pageBuilder: (BuildContext context, Animation<double> animation,
          Animation<double> secondaryAnimation) {
        return Container();
      },
    );
  }
}
