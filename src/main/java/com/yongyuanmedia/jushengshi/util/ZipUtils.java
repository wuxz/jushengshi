package com.yongyuanmedia.jushengshi.util;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.zip.CRC32;
import java.util.zip.CheckedInputStream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * ZIP压缩工具
 *
 * @author 梁栋
 * @since 1.0
 */
public class ZipUtils {

	public static final String EXT = ".zip";

	private static final String BASE_DIR = "";

	private static final String PATH = File.separator;

	private static final int BUFFER = 1024;

	/**
	 * 解压缩
	 *
	 * @param srcFile
	 * @throws Exception
	 */
	public static void decompress(File srcFile) throws Exception {
		final String basePath = srcFile.getParent();
		decompress(srcFile, basePath);
	}

	/**
	 * 解压缩
	 *
	 * @param srcFile
	 * @param destFile
	 * @throws Exception
	 */
	public static void decompress(File srcFile, File destFile)
			throws Exception {
		final CheckedInputStream cis = new CheckedInputStream(
				new FileInputStream(srcFile), new CRC32());

		final ZipInputStream zis = new ZipInputStream(cis);

		decompress(destFile, zis);

		zis.close();
	}

	/**
	 * 解压缩
	 *
	 * @param srcFile
	 * @param destPath
	 * @throws Exception
	 */
	public static void decompress(File srcFile, String destPath)
			throws Exception {
		decompress(srcFile, new File(destPath));
	}

	/**
	 * 文件 解压缩
	 *
	 * @param destFile
	 *            目标文件
	 * @param zis
	 *            ZipInputStream
	 * @throws Exception
	 */
	private static void decompress(File destFile, ZipInputStream zis)
			throws Exception {
		ZipEntry entry = null;
		while ((entry = zis.getNextEntry()) != null) {
			final String fileName = entry.getName()
					.substring(entry.getName().lastIndexOf('/') + 1);
			final String dir = destFile.getPath() + File.separator + fileName;
			final File dirFile = new File(dir);

			// 文件检查
			//fileProber(dirFile);

			if (entry.isDirectory() || fileName.startsWith(".")) {
				//dirFile.mkdirs();
			} else {
				decompressFile(dirFile, zis);
			}

			zis.closeEntry();
		}
	}

	/**
	 * 文件 解压缩
	 *
	 * @param srcPath
	 *            源文件路径
	 *
	 * @throws Exception
	 */
	public static void decompress(String srcPath) throws Exception {
		final File srcFile = new File(srcPath);

		decompress(srcFile);
	}

	/**
	 * 文件 解压缩
	 *
	 * @param srcPath
	 *            源文件路径
	 * @param destPath
	 *            目标文件路径
	 * @throws Exception
	 */
	public static void decompress(String srcPath, String destPath)
			throws Exception {
		final File srcFile = new File(srcPath);
		decompress(srcFile, destPath);
	}

	/**
	 * 文件解压缩
	 *
	 * @param destFile
	 *            目标文件
	 * @param zis
	 *            ZipInputStream
	 * @throws Exception
	 */
	private static void decompressFile(File destFile, ZipInputStream zis)
			throws Exception {
		final BufferedOutputStream bos = new BufferedOutputStream(
				new FileOutputStream(destFile));

		int count;
		final byte data[] = new byte[BUFFER];
		while ((count = zis.read(data, 0, BUFFER)) != -1) {
			bos.write(data, 0, count);
		}

		bos.close();
	}

	/**
	 * 文件探针
	 *
	 *
	 * 当父目录不存在时，创建目录！
	 *
	 *
	 * @param dirFile
	 */
	public static void fileProber(File dirFile) {
		final File parentFile = dirFile.getParentFile();
		if (!parentFile.exists()) {
			// 递归寻找上级目录
			fileProber(parentFile);

			parentFile.mkdir();
		}
	}

}
