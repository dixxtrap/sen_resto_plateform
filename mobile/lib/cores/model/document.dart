class Photo {
  int? id;
  String? fieldname;
  String? originalname;
  String? encoding;
  String? mimetype;
  String? destination;
  String? filename;
  String? path;
  int? size;
  String? createdAt;
  String? updatedAt;

  Photo(
      {this.id,
      this.fieldname,
      this.originalname,
      this.encoding,
      this.mimetype,
      this.destination,
      this.filename,
      this.path,
      this.size,
      this.createdAt,
      this.updatedAt});

  Photo.fromJson(Map<String, dynamic> json) {
    id = json['id'];
    fieldname = json['fieldname'];
    originalname = json['originalname'];
    encoding = json['encoding'];
    mimetype = json['mimetype'];
    destination = json['destination'];
    filename = json['filename'];
    path = json['path'];
    size = json['size'];
    createdAt = json['createdAt'];
    updatedAt = json['updatedAt'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = <String, dynamic>{};
    data['id'] = id;
    data['fieldname'] = fieldname;
    data['originalname'] = originalname;
    data['encoding'] = encoding;
    data['mimetype'] = mimetype;
    data['destination'] = destination;
    data['filename'] = filename;
    data['path'] = path;
    data['size'] = size;
    data['createdAt'] = createdAt;
    data['updatedAt'] = updatedAt;
    return data;
  }
}
