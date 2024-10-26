class Location {
  double? latitude;
  double? longitude;

  Location({this.latitude, this.longitude});

  Location.fromJson(Map<String, dynamic> json) {
    if (json['laltitude'] != null) {
      latitude = double.parse(json['laltitude'].toString());
    }
    if (json['longitude'] != null) {
      longitude = double.parse(json['longitude'].toString());
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['latitude'] = latitude;
    data['longitude'] = longitude;
    return data;
  }
}
