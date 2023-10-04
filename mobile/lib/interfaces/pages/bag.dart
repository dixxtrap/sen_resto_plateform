import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_polyline_points/flutter_polyline_points.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mobile/interfaces/pages/page_with_bottom_navigator_bar.dart';
import 'package:google_maps_flutter_android/google_maps_flutter_android.dart';
import 'package:google_maps_flutter_platform_interface/google_maps_flutter_platform_interface.dart';
import 'package:mobile/interfaces/utils/constant.dart';
import 'package:mobile/interfaces/utils/kprint.dart';

class Bag extends StatefulWidget {
  Bag({Key? key}) : super(key: key);

  @override
  State<Bag> createState() => _BagState();
}

class _BagState extends State<Bag> {
  final Completer<GoogleMapController> _controller =
      Completer<GoogleMapController>();
  final destination = LatLng(14.757556, -17.390524);
  LatLng source = LatLng(14.739400, -17.506737);
  List<LatLng> palylineCoordinates = [];
  static final CameraPosition _kGooglePlex = CameraPosition(
    target: LatLng(14.739400, -17.506737),
    zoom: 12.4746,
  );

  static const CameraPosition _kLake = CameraPosition(
      target: LatLng(14.739400, -17.506737),
      tilt: 59.440717697143555,
      zoom: 19.151926040649414);

  void getPolypoint() async {
    kprint("------------------------getPolyline------------------------");
    PolylinePoints polylinePoints = new PolylinePoints();
    PolylineResult result = await polylinePoints.getRouteBetweenCoordinates(
        "AIzaSyBvAWNwnWriL2711NBIetCY0y54WzVNeMA",
        PointLatLng(source.latitude, source.longitude),
        PointLatLng(destination.latitude, destination.longitude));
    if (result.points.isNotEmpty) {
      kprint("------------------------point not empty------------------------");

      result.points.forEach(
          (e) => palylineCoordinates.add(LatLng(e.latitude, e.longitude)));
      setState(() {});
    }
  }

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getPolypoint();
  }

  @override
  Widget build(BuildContext context) {
    return PageWithBottomNavigator(
      currentIndex: 2,
      body: GoogleMap(
        mapType: MapType.normal,
        initialCameraPosition: _kGooglePlex,
        myLocationEnabled: true,
        markers: {
          Marker(markerId: MarkerId("source"), position: source),
          Marker(markerId: MarkerId("destination"), position: destination),
        },
        polylines: {
          Polyline(
              polylineId: const PolylineId("route"),
              points: palylineCoordinates,
              color: kprimary,
              width: 3)
        },
        onMapCreated: (GoogleMapController controller) {
          kprint("Complete");
          _controller.complete(controller);
        },
      ),
    );
  }
}
