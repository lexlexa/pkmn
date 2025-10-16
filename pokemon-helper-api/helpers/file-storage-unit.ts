import { readFile, writeFile } from "fs/promises";

export class FileStorageUnit<T> {
  path = "";
  data: T | null = null;
  constructor(path: string, defaultData: T) {
    this.path = path;
    this.data = defaultData;
  }

  async init() {
    try {
      const data = (await readFile(this.path)).toString();
      this.data = JSON.parse(data);
    } catch {
      await writeFile(this.path, JSON.stringify(this.data));
    }
  }

  async update(data: T) {
    this.data = data;
  }

  async save() {
    await writeFile(this.path, JSON.stringify(this.data));
  }

  async sync() {
    await this.init();
  }

  async updateWithSync(data: T) {
    await this.update(data);
    await this.save();
    await this.sync();
  }

  async getData() {
    return this.data;
  }
}
