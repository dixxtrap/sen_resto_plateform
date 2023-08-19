import 'document.dart';

class FileDoc {
  int? id;
  int? plateId;
  int? photoId;
  Photo? photo;

  FileDoc({this.id, this.plateId, this.photoId, this.photo});

  FileDoc.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    plateId = json['plateId'];
    photoId = json['photoId'];
    photo = json['photo'] != null ? new Photo.fromJson(json['photo']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['id'] = this.id;
    data['plateId'] = this.plateId;
    data['photoId'] = this.photoId;
    if (this.photo != null) {
      data['photo'] = this.photo!.toJson();
    }
    return data;
  }
}
