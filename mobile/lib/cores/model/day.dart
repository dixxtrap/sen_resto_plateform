class Day {
  int? id;
  String? name;
  int? dayNumber;

  Day({this.id, this.name, this.dayNumber});

  Day.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    name = json['name'];
    dayNumber = json['dayNumber'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data =  <String, dynamic>{};
    data['id'] = id;
    data['name'] = name;
    data['dayNumber'] = dayNumber;
    return data;
  }
}
